<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, ref } from "vue";
import { useCookie } from "#imports";
import { useGraphQLUser } from "../composables/useGraphQLUser";
import auth from "~/middleware/auth";

const { isAuthenticated, logout } = useAuth0();
const { user, loading } = useGraphQLUser();
const userCookie = useCookie<{
  email: string;
  name: string;
}>("user-session");
const isEditing = ref(false);

onMounted(() => {
  if (isAuthenticated.value && user.value) {
    userCookie.value = {
      email: user.value.email as string,
      name: user.value.name as string,
    };
  }
});

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};

definePageMeta({
  middleware: auth,
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Profile Settings</h1>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div v-if="loading" class="text-center py-8">Loading...</div>

      <div v-else-if="user" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <ProfileCard
            :user="user"
            :is-editing="isEditing"
            @toggle-edit="isEditing = !isEditing"
          />
        </section>

        <section>
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Security</h2>
            <ResetPassword />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
