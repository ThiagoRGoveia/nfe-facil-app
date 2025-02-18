<template>
  <v-app>
    <v-overlay
      v-if="isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
    <router-view v-else />
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { isLoading } = storeToRefs(auth);

onMounted(async () => {
   await auth.initialize();
});
</script>
