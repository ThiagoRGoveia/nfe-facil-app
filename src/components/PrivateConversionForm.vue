<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PROCESS_BATCH_SYNC } from "@/graphql/private";
import ConversionForm from "./ConversionForm.vue";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  FileSpreadsheet,
  FileText,
  Loader2,
  AlertCircle
} from "lucide-vue-next";

interface DownloadLinks {
  json?: string | null;
  csv?: string | null;
  excel?: string | null;
}

const loading = ref(false);
const error = ref("");
const downloadLinks = ref<DownloadLinks>({});

const { mutate: processFiles } = useMutation(PROCESS_BATCH_SYNC);

const downloadFile = (data: string, format: string) => {
  const blob = new Blob([atob(data)], { 
    type: format === 'json' ? 'application/json' : 
          format === 'csv' ? 'text/csv' : 
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `converted-data.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const handleSubmit = async (data: { files: File[]; formats: string[] }) => {
  try {
    loading.value = true;
    error.value = "";
    downloadLinks.value = {};

    const result = await processFiles({
      variables: {
        input: {
          files: data.files,
          outputFormats: data.formats,
        }
      }
    });

    if (result?.data?.processBatchSync) {
      downloadLinks.value = {
        json: result.data.processBatchSync.jsonResults,
        csv: result.data.processBatchSync.csvResults,
        excel: result.data.processBatchSync.excelResults,
      };
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-full relative">
    <ConversionForm
      title="Conversão Privada de Arquivos"
      @submit="handleSubmit"
    />

    <div
      v-if="error"
      class="mt-4 p-4 border border-destructive text-destructive rounded-md flex items-start gap-2"
    >
      <AlertCircle class="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <div class="font-medium">Error</div>
        <div class="text-sm">{{ error }}</div>
      </div>
    </div>

    <div
      v-if="Object.keys(downloadLinks).length > 0"
      class="mt-4"
    >
      <Label class="text-base font-medium block mb-2">
        Download Converted Files
      </Label>
      <div class="flex flex-wrap gap-2">
        <Button
          v-if="downloadLinks.json"
          variant="outline"
          @click="downloadFile(downloadLinks.json!, 'json')"
          class="flex items-center"
        >
          <FileJson class="mr-2 h-4 w-4" />
          JSON
        </Button>
        
        <Button
          v-if="downloadLinks.csv"
          variant="outline"
          @click="downloadFile(downloadLinks.csv!, 'csv')"
          class="flex items-center"
        >
          <FileText class="mr-2 h-4 w-4" />
          CSV
        </Button>
        
        <Button
          v-if="downloadLinks.excel"
          variant="outline"
          @click="downloadFile(downloadLinks.excel!, 'xlsx')"
          class="flex items-center"
        >
          <FileSpreadsheet class="mr-2 h-4 w-4" />
          Excel
        </Button>
      </div>
    </div>

    <!-- Loading overlay -->
    <div 
      v-if="loading" 
      class="absolute inset-0 bg-background/80 flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-2">
        <Loader2 class="h-8 w-8 animate-spin text-primary" />
        <span class="text-sm">Processing files...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-full {
  height: 100%;
}
</style> 