<script setup lang="ts">
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-vue-next";

interface ProductFeature {
  name: string;
  condition: string;
  included: boolean;
}

interface Product {
  name: string;
  description: string;
  price: string;
  features: ProductFeature[];
}

defineProps<{
  products: Product[];
  ctaText?: string;
}>();
</script>

<template>
  <div class="pricing-table">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="flex flex-col"
      >
        <Card
          class="pricing-card flex-1 flex flex-col"
          :class="{ 'primary-plan': index === 1 }"
        >
          <CardTitle class="text-center p-6 text-xl font-bold">
            {{ product.name }}
          </CardTitle>
          <CardContent class="flex-1 flex flex-col">
            <div class="text-center mb-4">
              <div class="text-2xl font-bold">
                {{ product.price }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ product.description }}
              </div>
            </div>

            <div class="border-t my-4" />

            <ul class="space-y-2 flex-1">
              <li
                v-for="(feature, fIdx) in product.features"
                :key="fIdx"
                class="flex items-start py-1"
              >
                <div class="mr-2 mt-0.5">
                  <Check
                    v-if="feature.included"
                    class="h-4 w-4 text-success"
                  />
                  <X
                    v-else
                    class="h-4 w-4 text-destructive"
                  />
                </div>
                <div>
                  <div class="text-sm font-medium">
                    {{ feature.name }}
                  </div>
                  <div
                    v-if="feature.condition"
                    class="text-xs text-muted-foreground"
                  >
                    {{ feature.condition }}
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter class="p-6">
            <Button
              class="w-full"
              :variant="index === 1 ? 'default' : 'outline'"
            >
              {{ ctaText || "Choose Plan" }}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing-card {
  height: 100%;
  transition: transform 0.2s;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.primary-plan {
  border: 2px solid hsl(var(--primary));
}
</style>
