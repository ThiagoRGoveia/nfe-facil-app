<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const isEditing = ref(false);
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4 font-weight-bold">
        Perfil
      </h1>
    </div>

    <div
      v-if="auth.isLoading"
      class="d-flex justify-center align-center py-8"
    >
      <v-progress-circular indeterminate />
    </div>

    <v-row v-else-if="auth.user">
      <v-col cols="12">
        <ProfileCard
          :user="auth.user"
          :is-editing="isEditing"
          @toggle-edit="isEditing = !isEditing"
        />
      </v-col>

      <v-col 
        v-if="auth.user.isSocial"
        cols="12"
      >
        <v-card elevation="2">
          <v-card-title>Segurança</v-card-title>
          <v-card-text>
            <ResetPassword />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>API</v-card-title>
          <v-card-text>
            <ApiCredentials :user="auth.user" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
