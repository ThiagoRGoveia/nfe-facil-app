<script setup lang="ts">
import { ref } from 'vue';
import { PublicSyncProcessResponse } from '@/graphql/generated/graphql';
import DownloadFileCards from '@/components/business/file-conversion/DownloadFileCards.vue';
import { Button } from '@/components/ui/button';

const downloadLinks = ref<PublicSyncProcessResponse>({
  json: 'https://example.com/download/file.json',
  csv: 'https://example.com/download/file.csv',
  excel: 'https://example.com/download/file.xlsx',
});

const emptyLinks = ref<PublicSyncProcessResponse>({});

const partialLinks = ref<PublicSyncProcessResponse>({
  json: 'https://example.com/download/file.json',
  csv: null,
  excel: 'https://example.com/download/file.xlsx',
});

const activeExample = ref<'all' | 'partial' | 'none'>('all');

const handleError = (message: string) => {
  alert(`Error: ${message}`);
};

const toggleExample = (example: 'all' | 'partial' | 'none') => {
  activeExample.value = example;
};
</script>

<template>
  <div class="container mx-auto py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Download File Cards Test Page</h1>
    
    <div class="bg-muted p-4 rounded-lg mb-8">
      <div class="flex gap-4 mb-6">
        <Button 
          @click="toggleExample('all')" 
          :variant="activeExample === 'all' ? 'default' : 'outline'"
        >
          All Links
        </Button>
        <Button 
          @click="toggleExample('partial')" 
          :variant="activeExample === 'partial' ? 'default' : 'outline'"
        >
          Partial Links
        </Button>
        <Button 
          @click="toggleExample('none')" 
          :variant="activeExample === 'none' ? 'default' : 'outline'"
        >
          No Links
        </Button>
      </div>
      
      <div class="p-6 bg-background rounded-lg shadow-sm">
        <DownloadFileCards 
          v-if="activeExample === 'all'"
          :downloadLinks="downloadLinks" 
          @error="handleError" 
        />
        
        <DownloadFileCards 
          v-if="activeExample === 'partial'"
          :downloadLinks="partialLinks" 
          @error="handleError" 
        />
        
        <DownloadFileCards 
          v-if="activeExample === 'none'"
          :downloadLinks="emptyLinks" 
          @error="handleError" 
        />
      </div>
    </div>
    
    <div class="bg-muted/50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Component Information</h2>
      <p class="mb-3">This page displays the DownloadFileCards component with different mock data scenarios:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>All Links:</strong> Shows all three file format cards (JSON, CSV, Excel)</li>
        <li><strong>Partial Links:</strong> Shows only JSON and Excel cards, CSV is null</li>
        <li><strong>No Links:</strong> Shows no cards, as all links are null/undefined</li>
      </ul>
      <p class="mt-4 text-sm text-muted-foreground">
        Note: Clicking the download buttons will attempt to download from non-existent URLs,
        so you will see error messages.
      </p>
    </div>
  </div>
</template> 