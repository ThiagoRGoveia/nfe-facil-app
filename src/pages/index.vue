<script lang="ts" setup>
import { ref } from "vue";
const mockProducts = ref([
  {
    name: "Basic Package",
    description: "Essential features for startups",
    price: "R$ 99/mês",
    features: [
      { name: "24/7 Support", condition: "Email Only", included: false },
      { name: "Storage", condition: "100GB", included: true },
      { name: "Backups", condition: "Manual", included: false },
      { name: "Notas por mês", condition: "Até 50", included: true },
      { name: "Exportação CSV", condition: "", included: true },
    ],
  },
  {
    name: "Standard Package",
    description: "Great for small businesses",
    price: "R$ 199/mês",
    features: [
      { name: "24/7 Support", condition: "Business Hours", included: true },
      { name: "Storage", condition: "200GB", included: true },
      { name: "Backups", condition: "Weekly", included: true },
      { name: "Notas por mês", condition: "Até 200", included: true },
      { name: "Exportação CSV", condition: "", included: true },
    ],
  },
  {
    name: "Premium Package",
    description: "Our most comprehensive offering",
    price: "R$ 399/mês",
    features: [
      { name: "24/7 Support", condition: "Unlimited", included: true },
      { name: "Storage", condition: "500GB", included: true },
      { name: "Backups", condition: "Daily", included: true },
      { name: "Notas por mês", condition: "Ilimitado", included: true },
      { name: "Exportação CSV", condition: "", included: true },
    ],
  },
]);

const isLoading = ref(false);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <section class="max-w-3xl mx-auto mt-16">
      <h1 class="text-4xl font-bold text-center mb-8">NFe Fácil</h1>
      <ConversionForm title="Solte seus arquvos aqui" />
    </section>

    <section class="mb-16">
      <h2 class="text-2xl text-center mb-12">
        Extraia dados da sua nota fiscal
      </h2>
      <PricingTable :products="mockProducts" ctaText="Começar Agora" />
    </section>
  </div>
</template>
