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
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <section class="max-w-3xl mx-auto mt-16 h-[600px]">
      <div class="h-[calc(100%-4rem)]">
        <PublicConversionForm title="Solte seus arquivos aqui" />
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl text-center mb-12">
        Extraia os dados da sua Nota Fiscal Eletrônica
      </h2>
      <PricingTable :products="mockProducts" cta-text="Começar Agora" />
    </section>
  </div>
</template>
