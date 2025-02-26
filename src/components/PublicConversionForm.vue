<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PUBLIC_PROCESS_BATCH } from "@/graphql/public";
import {
  FileFormat,
  PublicProcessBatchSyncMutationVariables,
  PublicSyncProcessResponse,
} from "@/graphql/generated/graphql";
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

type ResponseData<T> = {
  publicProcessBatchSync: T;
};

const loading = ref(false);
const downloadingFiles = ref<Record<string, boolean>>({});
const error = ref("");
const downloadLinks = ref<PublicSyncProcessResponse>({});

const { mutate: processFiles } = useMutation<
  ResponseData<PublicSyncProcessResponse>,
  PublicProcessBatchSyncMutationVariables
>(PUBLIC_PROCESS_BATCH, {
  context: {
    hasUpload: true,
  },
});

const downloadFile = async (url: string, format: string) => {
  try {
    downloadingFiles.value[format] = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${format} file`);
    }
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `converted-data.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  } catch (e) {
    error.value = e instanceof Error ? e.message : `Failed to download ${format} file`;
  } finally {
    downloadingFiles.value[format] = false;
  }
};

const handleSubmit = async (data: { files: File[]; formats: FileFormat[] }) => {
  try {
    loading.value = true;
    error.value = "";
    downloadLinks.value = {};

    const result = await processFiles({
      input: {
        files: data.files,
        outputFormats: data.formats,
        templateId: import.meta.env.VITE_NFE_TEMPLATE,
      },
    });

    if (result?.data?.publicProcessBatchSync) {
      downloadLinks.value = {
        json: result.data.publicProcessBatchSync.json,
        csv: result.data.publicProcessBatchSync.csv,
        excel: result.data.publicProcessBatchSync.excel,
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
      title="Conversão Pública de Arquivos"
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
          :disabled="downloadingFiles['json']"
          @click="downloadFile(downloadLinks.json!, 'json')"
          class="flex items-center"
        >
          <div v-if="downloadingFiles['json']" class="mr-2">
            <Loader2 class="h-4 w-4 animate-spin" />
          </div>
          <FileJson v-else class="mr-2 h-4 w-4" />
          <span>JSON</span>
        </Button>
        
        <Button
          v-if="downloadLinks.csv"
          variant="outline"
          :disabled="downloadingFiles['csv']"
          @click="downloadFile(downloadLinks.csv!, 'csv')"
          class="flex items-center"
        >
          <div v-if="downloadingFiles['csv']" class="mr-2">
            <Loader2 class="h-4 w-4 animate-spin" />
          </div>
          <FileText v-else class="mr-2 h-4 w-4" />
          <span>CSV</span>
        </Button>
        
        <Button
          v-if="downloadLinks.excel"
          variant="outline"
          :disabled="downloadingFiles['excel']"
          @click="downloadFile(downloadLinks.excel!, 'xlsx')"
          class="flex items-center"
        >
          <div v-if="downloadingFiles['excel']" class="mr-2">
            <Loader2 class="h-4 w-4 animate-spin" />
          </div>
          <FileSpreadsheet v-else class="mr-2 h-4 w-4" />
          <span>Excel</span>
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
