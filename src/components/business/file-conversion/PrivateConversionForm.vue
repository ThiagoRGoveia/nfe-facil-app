<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PROCESS_BATCH_SYNC } from "@/graphql/private";
import ConversionForm from "./ConversionForm.vue";
import ConversionResult from "./ConversionResult.vue";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { FileFormat } from "@/graphql/generated/graphql";

interface DownloadLinks {
  json?: string | null;
  csv?: string | null;
  excel?: string | null;
}

interface FileError {
  fileName: string;
  error: string;
}

const loading = ref(false);
const processing = ref(false);
const error = ref("");
const fileErrors = ref<FileError[]>([]);
const downloadLinks = ref<DownloadLinks>({});
const { toast } = useToast();

// Watch for error changes and show a toast when there's an error
watch(error, (newError) => {
  if (newError) {
    toast({
      variant: "destructive",
      title: "Erro",
      description: newError
    });
  }
});

const { mutate: processFiles } = useMutation(PROCESS_BATCH_SYNC);

const handleSubmit = async (data: { files: File[]; formats: FileFormat[] }) => {
  try {
    processing.value = true;
    loading.value = true;
    error.value = "";
    fileErrors.value = [];
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
      
      // Store file errors if they exist
      if (result.data.processBatchSync.errors && 
          result.data.processBatchSync.errors.length > 0) {
        fileErrors.value = result.data.processBatchSync.errors;
      }
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Tivemos um problema, tente novamente mais tarde";
  } finally {
    loading.value = false;
  }
};

const handleDownloadError = (message: string) => {
  error.value = message;
};

const handleReset = () => {
  processing.value = false;
  downloadLinks.value = {};
  fileErrors.value = [];
  error.value = "";
};
</script>

<template>
  <div class="h-full relative">
    <!-- Show ConversionForm if not processing -->
    <ConversionForm
      v-if="!processing"
      title="Conversão Privada de Arquivos"
      @submit="handleSubmit"
    />
    
    <!-- Show results after processing -->
    <ConversionResult 
      v-else
      :downloadLinks="downloadLinks"
      :errors="fileErrors"
      :errorMessage="error"
      @error="handleDownloadError"
      @reset="handleReset"
    />

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