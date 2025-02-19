<script setup lang="ts">
import { computed } from "vue";

interface ProductFeature {
  name: string;
  condition: string;
  included: boolean;
}

interface Product {
  name: string;
  description: string;
  image: string; // Added to support an image in the card
  features: ProductFeature[];
}

const props = defineProps<{
  products: Product[];
  ctaText?: string;
}>();

// Group products into chunks of 3 for the carousel slides.
const groupedProducts = computed(() => {
  const groups: Product[][] = [];
  for (let i = 0; i < props.products.length; i += 3) {
    groups.push(props.products.slice(i, i + 3));
  }
  return groups;
});
</script>

<template>
  <div>
    <v-carousel
      cycle
      height="300"
    >
      <v-carousel-item
        v-for="(group, index) in groupedProducts"
        :key="index"
      >
        <v-row>
          <v-col
            v-for="(product, idx) in group"
            :key="idx"
            cols="12"
            md="4"
          >
            <v-card outlined>
              <v-img
                :src="product.image"
                alt="Product image"
                height="200"
              />
              <v-card-title class="headline">
                {{ product.name }}
              </v-card-title>
              <v-card-text>
                <div class="body-1 mb-2">
                  {{ product.description }}
                </div>
                <v-list dense>
                  <v-list-item
                    v-for="(feature, fIdx) in product.features"
                    :key="fIdx"
                  >
                    <v-list-item-icon>
                      <v-icon
                        v-if="feature.included"
                        size="16"
                        color="green"
                      >
                        mdi-check
                      </v-icon>
                      <v-icon
                        v-else
                        size="16"
                        color="red"
                      >
                        mdi-close
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="subtitle-1">
                        {{ feature.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="caption">
                        {{ feature.condition }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="mt-6 text-center">
      <v-btn
        color="primary"
        large
      >
        {{ ctaText || "Learn More" }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling if required */
</style>
