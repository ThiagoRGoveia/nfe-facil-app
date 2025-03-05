<script setup lang="ts">
import { ref } from 'vue';
import FileErrorsDisplay from '@/components/business/file-conversion/FileErrorsDisplay.vue';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle, RefreshCw } from 'lucide-vue-next';

interface FileError {
  fileName: string;
  error: string;
}

// Sample error messages
const errorTypes = [
  'Invalid file format',
  'File is corrupted',
  'Unable to parse XML',
  'Missing required fields',
  'Invalid tax information',
  'Signature validation failed',
  'Document with inconsistent data',
];

// Sample filenames
const fileNames = [
  'nota_fiscal_123.xml',
  'nfe_empresa_456.xml',
  'nfce_789.xml',
  'invoice_2023_10_15.xml',
  'nfe_cancelada.xml',
  'documento_fiscal.xml',
  'pedido_234.xml',
];

// Create a sample of errors
const generateRandomErrors = (count: number): FileError[] => {
  const result: FileError[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      fileName: fileNames[Math.floor(Math.random() * fileNames.length)],
      error: errorTypes[Math.floor(Math.random() * errorTypes.length)],
    });
  }
  return result;
};

// Create different sets of errors
const noErrors = ref<FileError[]>([]);
const fewErrors = ref<FileError[]>(generateRandomErrors(2));
const manyErrors = ref<FileError[]>(generateRandomErrors(5));

const activeExample = ref<'none' | 'few' | 'many'>('few');

const toggleExample = (example: 'none' | 'few' | 'many') => {
  activeExample.value = example;
};

const regenerateErrors = () => {
  fewErrors.value = generateRandomErrors(2);
  manyErrors.value = generateRandomErrors(5);
};

// Add or remove a single error
const addError = () => {
  const currentErrors = activeExample.value === 'few' ? fewErrors : manyErrors;
  currentErrors.value.push({
    fileName: fileNames[Math.floor(Math.random() * fileNames.length)],
    error: errorTypes[Math.floor(Math.random() * errorTypes.length)],
  });
};

const removeError = () => {
  const currentErrors = activeExample.value === 'few' ? fewErrors : manyErrors;
  if (currentErrors.value.length > 0) {
    currentErrors.value.pop();
  }
};
</script>

<template>
  <div class="container mx-auto py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">File Errors Display Test Page</h1>
    
    <div class="bg-muted p-4 rounded-lg mb-8">
      <div class="flex gap-4 mb-6">
        <Button 
          @click="toggleExample('none')" 
          :variant="activeExample === 'none' ? 'default' : 'outline'"
        >
          No Errors
        </Button>
        <Button 
          @click="toggleExample('few')" 
          :variant="activeExample === 'few' ? 'default' : 'outline'"
        >
          Few Errors
        </Button>
        <Button 
          @click="toggleExample('many')" 
          :variant="activeExample === 'many' ? 'default' : 'outline'"
        >
          Many Errors
        </Button>
      </div>
      
      <div class="flex gap-3 mb-6">
        <Button variant="outline" size="sm" @click="addError" class="flex items-center gap-2">
          <PlusCircle class="h-4 w-4" />
          Add Error
        </Button>
        <Button variant="outline" size="sm" @click="removeError" class="flex items-center gap-2">
          <MinusCircle class="h-4 w-4" />
          Remove Error
        </Button>
        <Button variant="outline" size="sm" @click="regenerateErrors" class="flex items-center gap-2">
          <RefreshCw class="h-4 w-4" />
          Regenerate
        </Button>
      </div>
      
      <div class="p-6 bg-background rounded-lg shadow-sm">
        <FileErrorsDisplay 
          v-if="activeExample === 'none'"
          :errors="noErrors" 
        />
        
        <FileErrorsDisplay 
          v-if="activeExample === 'few'"
          :errors="fewErrors" 
        />
        
        <FileErrorsDisplay 
          v-if="activeExample === 'many'"
          :errors="manyErrors" 
        />
      </div>
    </div>
    
    <div class="bg-muted/50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Component Information</h2>
      <p class="mb-3">This page displays the FileErrorsDisplay component with different mock data scenarios:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>No Errors:</strong> Shows the empty state message</li>
        <li><strong>Few Errors:</strong> Shows a small number of error cards (2)</li>
        <li><strong>Many Errors:</strong> Shows a larger number of error cards (5)</li>
      </ul>
      <p class="mt-4">
        You can use the Add/Remove buttons to see how the component responds to changing error counts,
        and the Regenerate button to create new random errors.
      </p>
    </div>
  </div>
</template> 