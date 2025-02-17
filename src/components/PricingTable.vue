<script setup lang="ts">
import { defineProps } from "vue";

interface ProductFeature {
  name: string;
  condition: string;
  included: boolean;
}

interface Product {
  name: string;
  description: string;
  price: string; // Added price field
  features: ProductFeature[];
}

const props = defineProps<{
  products: Product[];
  ctaText?: string;
}>();
</script>

<template>
  <div class="pricing-table">
    <v-container>
      <v-row>
        <v-col
          v-for="(product, index) in products"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card
            class="pricing-card"
            elevation="2"
            :class="{ 'primary-plan': index === 1 }"
          >
            <v-card-title class="text-center text-h5 pt-6 font-weight-bold">
              {{ product.name }}
            </v-card-title>
            <v-card-text>
              <div class="text-center mb-4">
                <div class="text-h4 font-weight-bold">
                  {{ product.price }}
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ product.description }}
                </div>
              </div>

              <v-divider class="mb-4"></v-divider>

              <v-list density="compact">
                <v-list-item
                  v-for="(feature, fIdx) in product.features"
                  :key="fIdx"
                  class="px-2"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="feature.included ? 'success' : 'error'"
                      size="small"
                    >
                      {{
                        feature.included
                          ? "mdi-check-circle"
                          : "mdi-close-circle"
                      }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ feature.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-if="feature.condition"
                    class="text-caption"
                  >
                    {{ feature.condition }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="pb-6">
              <v-btn
                block
                :color="index === 1 ? 'primary' : 'default'"
                :variant="index === 1 ? 'elevated' : 'outlined'"
                class="mx-4"
              >
                {{ ctaText || "Choose Plan" }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.pricing-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.primary-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.v-list-item {
  min-height: 40px;
}
</style>
