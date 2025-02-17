<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const isEditing = ref(false);

const handleLogout = () => {
  auth.logout();
};
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

      <div v-if="auth.isLoading" class="text-center py-8">Loading...</div>

      <div v-else-if="auth.user" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <ProfileCard
            :user="auth.user"
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
