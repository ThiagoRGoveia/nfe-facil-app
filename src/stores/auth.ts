import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User as Auth0User } from "@auth0/auth0-vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useGraphQLUser } from "@/composables/useGraphQLUser";
import type { User } from "@/graphql/generated/graphql";

export const useAuthStore = defineStore("auth", () => {
  const auth0User = ref<Auth0User | null>(null);
  const user = ref<User | null>(null);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  const isAuthenticated = computed(() => !!auth0User.value);

  const {
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  async function fetchGraphQLUser() {
    const { user, loading, error: gqlError } = useGraphQLUser();

    // Wait for GraphQL user to load
    if (loading.value) {
      await new Promise<void>((resolve) => {
        const checkLoading = setInterval(() => {
          if (!loading.value) {
            clearInterval(checkLoading);
            resolve();
          }
        }, 50);
      });
    }

    if (gqlError.value) {
      throw gqlError.value;
    }

    return user.value;
  }

  async function initialize() {
    try {
      const auth0 = useAuth0();
      isLoading.value = true;

      // Wait for Auth0 to initialize
      if (auth0.isLoading.value) {
        await new Promise<void>((resolve) => {
          const checkLoading = setInterval(() => {
            if (!auth0.isLoading.value) {
              clearInterval(checkLoading);
              resolve();
            }
          }, 50);
        });
      }
      if (auth0.isAuthenticated.value && auth0.user.value) {
        auth0User.value = auth0.user.value;
        // Fetch GraphQL user data
        try {
          user.value = await fetchGraphQLUser();
        } catch (err) {
          console.error("Failed to fetch user:", err);
          // Don't throw here, as we still have basic auth0 user data
        }
      } else {
        // User is not authenticated, redirect to login
        await loginWithRedirect();
        return; // Stop execution as we're redirecting
      }
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  }

  async function login() {
    await loginWithRedirect();
  }

  async function logout() {
    auth0User.value = null;
    user.value = null;
    await auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  }

  async function getToken() {
    return await getAccessTokenSilently();
  }

  return {
    auth0User,
    user,
    isLoading,
    error,
    isAuthenticated,
    initialize,
    login,
    logout,
    getToken,
  };
});
