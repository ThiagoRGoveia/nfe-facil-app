<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="auth.isLoading"
      class="text-center py-8"
    >
      <v-progress-circular
        indeterminate
        size="64"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <section>
        <h2 class="text-2xl font-semibold mb-6">
          Convert Files
        </h2>
        <ConversionForm title="Solte seus arquvos aqui" />
      </section>
    </div>
  </div>
</template>
