<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PUBLIC_PROCESS_BATCH } from "@/graphql/public";
import {
  FileFormat,
  PublicProcessBatchSyncMutationVariables,
  PublicSyncProcessResponse,
} from "@/graphql/generated/graphql";
import ConversionForm from "./ConversionForm.vue";
import ConversionResult from "./ConversionResult.vue";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";

// Define interface for file errors
interface FileError {
  fileName: string;
  error: string;
}

type ResponseData<T> = {
  publicProcessBatchSync: T & {
    errors?: FileError[];
  };
};

const loading = ref(false);
const processing = ref(false);
const error = ref("");
const fileErrors = ref<FileError[]>([]);
const downloadLinks = ref<PublicSyncProcessResponse>({});
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

// Watch for file errors and show a toast when there are new file errors
watch(fileErrors, (newErrors) => {
  if (newErrors.length > 0) {
    toast({
      variant: "destructive",
      title: "Erro ao processar arquivos",
      description: `${newErrors.length} arquivo(s) falhou ao processar.`
    });
  }
});

const { mutate: processFiles } = useMutation<
  ResponseData<PublicSyncProcessResponse>,
  PublicProcessBatchSyncMutationVariables
>(PUBLIC_PROCESS_BATCH, {
  context: {
    hasUpload: true,
  },
});

const handleSubmit = async (data: { files: File[]; formats: FileFormat[] }) => {
  try {
    processing.value = true;
    loading.value = true;
    error.value = "";
    fileErrors.value = [];
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
      
      // Store file errors if they exist
      if (result.data.publicProcessBatchSync.errors && 
          result.data.publicProcessBatchSync.errors.length > 0) {
        fileErrors.value = result.data.publicProcessBatchSync.errors;
      }
      
      // Check if we have no links and no errors - general error case
      if (!hasLinks.value && fileErrors.value.length === 0) {
        error.value = "Tivemos um problema, tente novamente mais tarde";
      }
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Tivemos um problema, tente novamente mais tarde";
  } finally {
    loading.value = false;
  }
};

const hasLinks = computed(() => {
  return Object.values(downloadLinks.value).some(link => link !== null && link !== undefined);
});

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
      @submit="handleSubmit"
      :max-files="1"
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
    
    <!-- Toast container -->
    <Toaster />
    
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
