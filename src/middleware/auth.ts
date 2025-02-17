import type { NavigationGuard } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const auth: NavigationGuard = (to, from, next) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Wait for Auth0 to initialize
  if (isLoading.value) {
    const checkAuth = setInterval(() => {
      if (!isLoading.value) {
        clearInterval(checkAuth);
        if (isAuthenticated.value) {
          next();
        } else {
          next("/");
        }
      }
    }, 50);
    return;
  }

  if (isAuthenticated.value) {
    next();
  } else {
    next("/");
  }
};

export default auth;
