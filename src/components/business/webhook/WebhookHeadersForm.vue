<script setup lang="ts">
import { computed } from 'vue';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from 'lucide-vue-next';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

interface Props {
  modelValue?: Record<string, string>;
  name?: string; // Field name for integration with form
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  name: 'headers'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, string>): void;
}>();

// Create a reactive array of key-value pairs from the headers object
const headers = computed(() => {
  const result = [];
  for (const [key, value] of Object.entries(props.modelValue || {})) {
    result.push({ key, value });
  }

  return result;
});

// Update the headers object when a key or value changes
const updateHeader = (index: number, field: 'key' | 'value', newValue: string) => {
  const newHeaders = [...headers.value];
  newHeaders[index][field] = newValue;
  
  // Build a new headers object and emit it
  const newHeadersObject: Record<string, string> = {};
  newHeaders.forEach(header => {
    if (header.key.trim()) {
      newHeadersObject[header.key] = header.value;
    }
  });
  
  emit('update:modelValue', newHeadersObject);
};

// Add a new empty header
const addHeader = () => {
  const headerIndex = headers.value.length;
  const newHeaders = [...headers.value, { key: `header-${headerIndex}`, value: '' }];
  
  // Build a new headers object and emit it
  const newHeadersObject: Record<string, string> = {};
  newHeaders.forEach(header => {
    if (header.key.trim()) {
      newHeadersObject[header.key] = header.value;
    }
  });
  emit('update:modelValue', newHeadersObject);
};

// Remove a header at the specified index
const removeHeader = (index: number) => {
  const newHeaders = [...headers.value];
  newHeaders.splice(index, 1);
  
  // Build a new headers object and emit it
  const newHeadersObject: Record<string, string> = {};
  newHeaders.forEach(header => {
    if (header.key.trim()) {
      newHeadersObject[header.key] = header.value;
    }
  });
  
  emit('update:modelValue', newHeadersObject);
};
</script>

<template>
  <FormField
    :name="props.name"
  >
    <FormItem class="space-y-4">
      <div class="flex items-center justify-between">
        <FormLabel>Headers</FormLabel>
        <Button 
          variant="outline" 
          size="sm" 
          class="rounded-full w-8 h-8 p-0"
          type="button"
          @click="addHeader"
        >
          <Plus class="h-4 w-4" />
          <span class="sr-only">Adicionar Header</span>
        </Button>
      </div>
      
      <FormControl>
        <div class="space-y-3">
          <div 
            v-for="(header, index) in headers" 
            :key="index"
            class="grid grid-cols-[1fr_1fr_auto] gap-2 items-start"
          >
            <div>
              <Input
                :value="header.key"
                placeholder="Nome do Header"
                class="w-full"
                @input="(e: Event) => updateHeader(index, 'key', (e.target as HTMLInputElement).value)"
              />
            </div>
            
            <div>
              <Input
                :value="header.value"
                placeholder="Valor"
                class="w-full"
                @input="(e: Event) => updateHeader(index, 'value', (e.target as HTMLInputElement).value)"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              class="rounded-full p-0 w-8 h-8 mt-1"
              type="button"
              @click="removeHeader(index)"
            >
              <X class="h-4 w-4" />
              <span class="sr-only">Remover Header</span>
            </Button>
          </div>
        </div>
      </FormControl>
      
      <div class="text-xs text-muted-foreground">
        Adicione cabeçalhos HTTP personalizados para serem enviados com a requisição.
      </div>
      
      <FormMessage />
    </FormItem>
  </FormField>
</template> 