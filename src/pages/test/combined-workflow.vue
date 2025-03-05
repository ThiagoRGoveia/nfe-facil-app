<script setup lang="ts">
import { ref, computed } from 'vue';
import { PublicSyncProcessResponse } from '@/graphql/generated/graphql';
import ConversionForm from '@/components/business/file-conversion/ConversionForm.vue';
import DownloadFileCards from '@/components/business/file-conversion/DownloadFileCards.vue';
import FileErrorsDisplay from '@/components/business/file-conversion/FileErrorsDisplay.vue';
import { Button } from '@/components/ui/button';
import { 
  FileJson, 
  FileCheck,
  FileWarning,
  RefreshCw, 
  FileX,
  AlertTriangle
} from 'lucide-vue-next';

interface FileError {
  fileName: string;
  error: string;
}

// Workflow states
type WorkflowState = 'form' | 'results';
const currentState = ref<WorkflowState>('form');

// Different result scenarios
type ResultScenario = 'allSuccess' | 'partialSuccess' | 'allFailure';
const currentScenario = ref<ResultScenario>('partialSuccess');

// Mock data for successful files
const successfulDownloadLinks = ref<PublicSyncProcessResponse>({
  json: 'https://example.com/download/file.json',
  csv: 'https://example.com/download/file.csv',
  excel: 'https://example.com/download/file.xlsx',
});

const partialDownloadLinks = ref<PublicSyncProcessResponse>({
  json: 'https://example.com/download/file.json',
  csv: null,
  excel: 'https://example.com/download/file.xlsx',
});

const noDownloadLinks = ref<PublicSyncProcessResponse>({});

// Mock data for file errors
const allErrors = ref<FileError[]>([
  { fileName: 'nota_fiscal_123.xml', error: 'Invalid file format' },
  { fileName: 'nfe_empresa_456.xml', error: 'Unable to parse XML' },
  { fileName: 'nfce_789.xml', error: 'Missing required fields' },
  { fileName: 'invoice_2023_10_15.xml', error: 'Invalid tax information' },
]);

const partialErrors = ref<FileError[]>([
  { fileName: 'nfe_empresa_456.xml', error: 'Unable to parse XML' },
  { fileName: 'nfce_789.xml', error: 'Missing required fields' },
]);

const noErrors = ref<FileError[]>([]);

// Computed properties to determine what to show based on the current scenario
const downloadLinks = computed(() => {
  switch (currentScenario.value) {
    case 'allSuccess':
      return successfulDownloadLinks.value;
    case 'partialSuccess':
      return partialDownloadLinks.value;
    case 'allFailure':
      return noDownloadLinks.value;
  }
});

const errors = computed(() => {
  switch (currentScenario.value) {
    case 'allSuccess':
      return noErrors.value;
    case 'partialSuccess':
      return partialErrors.value;
    case 'allFailure':
      return allErrors.value;
  }
});

const hasLinks = computed(() => {
  return Object.values(downloadLinks.value).some(link => link !== null && link !== undefined);
});

const shouldShowErrors = computed(() => {
  return errors.value.length > 0 || !hasLinks.value;
});

// Handle form submission
const handleFormSubmit = (data: any) => {
  console.log('Form submitted with data:', data);
  // Simulate processing delay
  setTimeout(() => {
    currentState.value = 'results';
  }, 1000);
};

// Reset workflow back to form
const resetWorkflow = () => {
  currentState.value = 'form';
};

// Switch between result scenarios
const setScenario = (scenario: ResultScenario) => {
  currentScenario.value = scenario;
};

// Handle download errors
const handleDownloadError = (message: string) => {
  alert(`Download error: ${message}`);
};
</script>

<template>
  <div class="container mx-auto py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Combined Workflow Test Page</h1>
    
    <!-- Scenario selector - only visible in results view -->
    <div v-if="currentState === 'results'" class="mb-8">
      <h2 class="text-lg font-medium mb-3">Test Scenarios:</h2>
      <div class="flex gap-4">
        <Button 
          @click="setScenario('allSuccess')" 
          :variant="currentScenario === 'allSuccess' ? 'default' : 'outline'"
          class="flex items-center gap-2"
        >
          <FileCheck class="h-4 w-4" />
          All Files Successful
        </Button>
        <Button 
          @click="setScenario('partialSuccess')" 
          :variant="currentScenario === 'partialSuccess' ? 'default' : 'outline'"
          class="flex items-center gap-2"
        >
          <FileWarning class="h-4 w-4" />
          Some Files Failed
        </Button>
        <Button 
          @click="setScenario('allFailure')" 
          :variant="currentScenario === 'allFailure' ? 'default' : 'outline'"
          class="flex items-center gap-2"
        >
          <FileX class="h-4 w-4" />
          All Files Failed
        </Button>
      </div>
    </div>
    
    <div class="bg-muted p-6 rounded-lg mb-8 min-h-[400px]">
      <!-- Conversion Form View -->
      <div v-if="currentState === 'form'" class="h-full">
        <ConversionForm @submit="handleFormSubmit" :max-files="5" />
      </div>
      
      <!-- Results View -->
      <div v-else class="h-full">
        <ConversionResult 
          :downloadLinks="downloadLinks"
          :errors="errors"
          @error="handleDownloadError"
          @reset="resetWorkflow"
        />
      </div>
    </div>
    
    <!-- Toggle button to switch between form and results -->
    <div class="flex justify-center mb-8">
      <Button 
        @click="currentState = currentState === 'form' ? 'results' : 'form'"
        variant="outline"
        class="flex items-center gap-2"
      >
        <RefreshCw class="h-4 w-4" />
        Toggle Form/Results
      </Button>
    </div>
    
    <div class="bg-muted/50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Workflow Information</h2>
      <p class="mb-3">This page simulates the complete workflow of the file conversion process:</p>
      <ol class="list-decimal pl-6 space-y-2">
        <li><strong>Initial State:</strong> Shows the ConversionForm for uploading files</li>
        <li><strong>After Processing:</strong> Replaces the form with the results view, showing:
          <ul class="list-disc pl-6 mt-2">
            <li>Download cards for successful files</li>
            <li>Error cards for failed files</li>
          </ul>
        </li>
      </ol>
      <p class="mt-4">
        You can test different scenarios using the buttons at the top, and
        toggle between the form and results view to see how they transition.
      </p>
    </div>
  </div>
</template> 