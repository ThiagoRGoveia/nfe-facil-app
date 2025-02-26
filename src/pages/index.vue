<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { Loader2 } from "lucide-vue-next";

const auth = useAuthStore();
</script>

<template>
  <div class="container mx-auto px-4 py-8 h-full">
    <div
      v-if="auth.isLoading"
      class="flex items-center justify-center py-8"
    >
      <Loader2 class="h-16 w-16 animate-spin text-primary" />
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
    >
      <section class="h-full">
        <h2 class="text-2xl font-semibold mb-6">
          Extraia os dados da sua Nota Fiscal Eletrônica
        </h2>
        <div class="h-[calc(100%-4rem)]">
          <ConversionForm title="Solte seus arquivos aqui" />
        </div>
      </section>
    </div>
  </div>
</template>
