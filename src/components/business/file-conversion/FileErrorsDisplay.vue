<script setup lang="ts">
import { ref } from "vue";
import { File, AlertCircle, ChevronDown, ChevronUp } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileError {
  fileName: string;
  error: string;
}

defineProps<{
  errors: FileError[];
}>();

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="mt-6">
    <div v-if="errors.length > 0">
      <Button 
        variant="outline" 
        class="flex items-center gap-2 mb-4 w-full justify-start"
        @click="toggleOpen"
      >
        <AlertCircle class="h-5 w-5 text-destructive" />
        <span>{{ isOpen ? 'Ocultar' : 'Mostrar' }} Arquivos com erro ({{ errors.length }})</span>
        <ChevronDown v-if="!isOpen" class="h-4 w-4 ml-auto" />
        <ChevronUp v-else class="h-4 w-4 ml-auto" />
      </Button>
      
      <div v-if="isOpen" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
        <Card v-for="(error, index) in errors" :key="index" class="border-destructive/50">
          <CardContent class="p-4 flex gap-4">
            <File class="h-10 w-10 text-destructive shrink-0" />
            <div>
              <h3 class="font-semibold text-base">{{ error.fileName }}</h3>
              <p class="text-sm text-destructive mt-1">{{ error.error }}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template> 