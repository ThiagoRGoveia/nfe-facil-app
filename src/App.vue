<template>
  <TheThemeProvider>
    <div class="min-h-screen">
      <Toaster />
      <div
        v-if="isLoading"
        class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <Loader2 class="h-16 w-16 animate-spin text-primary" />
      </div>
      <router-view v-else />
    </div>
  </TheThemeProvider>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Loader2 } from "lucide-vue-next";
import { TheThemeProvider } from "@/components/ui/theme-provider";

const auth = useAuthStore();
const { isLoading } = storeToRefs(auth);

onMounted(async () => {
   await auth.initialize();
});
</script>
