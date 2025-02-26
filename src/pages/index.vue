<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { Loader2 } from "lucide-vue-next";

const auth = useAuthStore();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="auth.isLoading"
      class="flex items-center justify-center py-8"
    >
      <Loader2 class="h-16 w-16 animate-spin text-primary" />
    </div>

    <div v-else>
      <section class="max-w-3xl mx-auto mt-16 h-[600px]">
        <div class="h-[calc(100%-4rem)]">
          <ConversionForm title="Solte seus arquivos aqui" />
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl text-center mb-12">
          Extraia os dados da sua Nota Fiscal Eletrônica
        </h2>
        <!-- Additional content can go here -->
      </section>
    </div>
  </div>
</template>
