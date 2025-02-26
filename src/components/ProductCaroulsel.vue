<script setup lang="ts">
import { computed, ref } from "vue";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-vue-next";

interface ProductFeature {
  name: string;
  condition: string;
  included: boolean;
}

interface Product {
  name: string;
  description: string;
  image: string;
  features: ProductFeature[];
}

const props = defineProps<{
  products: Product[];
  ctaText?: string;
}>();

// Group products into chunks of 3 for the carousel slides
const groupedProducts = computed(() => {
  const groups: Product[][] = [];
  for (let i = 0; i < props.products.length; i += 3) {
    groups.push(props.products.slice(i, i + 3));
  }
  return groups;
});

// Carousel state
const currentSlide = ref(0);

// Navigation methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % groupedProducts.value.length;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? groupedProducts.value.length - 1 
    : currentSlide.value - 1;
};

// Auto-cycle the carousel
let intervalId: number | null = null;

const startAutoSlide = () => {
  intervalId = window.setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// Start auto-cycling when component is mounted
startAutoSlide();

// Clean up when component is unmounted
onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <div class="w-full">
    <!-- Carousel -->
    <div class="relative overflow-hidden">
      <!-- Carousel content -->
      <div 
        class="carousel-container transition-transform duration-500"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(group, index) in groupedProducts" 
          :key="index"
          class="carousel-slide"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="(product, idx) in group" 
              :key="idx"
              class="col-span-1"
            >
              <Card class="h-full">
                <div class="relative h-48">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="h-full w-full object-cover rounded-t-lg"
                  >
                </div>
                
                <CardHeader>
                  <CardTitle>{{ product.name }}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p class="text-muted-foreground mb-4">
                    {{ product.description }}
                  </p>
                  
                  <ul class="space-y-2">
                    <li 
                      v-for="(feature, fIdx) in product.features" 
                      :key="fIdx"
                      class="flex items-start"
                    >
                      <div class="mr-2 mt-0.5">
                        <Check
                          v-if="feature.included"
                          class="h-4 w-4 text-green-500"
                        />
                        <X
                          v-else
                          class="h-4 w-4 text-red-500"
                        />
                      </div>
                      <div>
                        <p class="text-sm font-medium">
                          {{ feature.name }}
                        </p>
                        <p class="text-xs text-muted-foreground">
                          {{ feature.condition }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Carousel navigation -->
      <Button 
        variant="outline" 
        size="icon" 
        class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full"
        @click="prevSlide"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full"
        @click="nextSlide"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
      
      <!-- Dots indicator -->
      <div class="flex justify-center mt-4">
        <button 
          v-for="(_, index) in groupedProducts" 
          :key="index"
          class="mx-1 w-2 h-2 rounded-full transition-colors duration-300"
          :class="index === currentSlide ? 'bg-primary' : 'bg-muted'"
          @click="currentSlide = index"
          @mouseenter="stopAutoSlide"
          @mouseleave="startAutoSlide"
        />
      </div>
    </div>
    
    <!-- CTA Button -->
    <div class="mt-6 text-center">
      <Button size="lg">
        {{ ctaText || "Learn More" }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  display: flex;
  width: 100%;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}
</style>
