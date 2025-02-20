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
  console.log(data);
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

    console.log(result);

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
  <div class="h-full">
    <ConversionForm
      title="Conversão Pública de Arquivos"
      @submit="handleSubmit"
    />

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      {{ error }}
    </v-alert>

    <v-container
      v-if="Object.keys(downloadLinks).length > 0"
      class="px-0 mt-4"
    >
      <v-label class="text-subtitle-1 mb-2">
        Download Converted Files
      </v-label>
      <v-row>
        <v-col
          v-if="downloadLinks.json"
          cols="auto"
        >
          <v-btn
            color="primary"
            variant="outlined"
            class="mr-2"
            :disabled="downloadingFiles['json']"
            @click="downloadFile(downloadLinks.json!, 'json')"
          >
            <v-icon start>
              mdi-code-json
            </v-icon>
            <v-progress-circular
              v-if="downloadingFiles['json']"
              indeterminate
              size="20"
              width="2"
              color="primary"
              class="mr-2"
            />
            <span>JSON</span>
          </v-btn>
        </v-col>
        <v-col
          v-if="downloadLinks.csv"
          cols="auto"
        >
          <v-btn
            color="primary"
            variant="outlined"
            class="mr-2"
            :disabled="downloadingFiles['csv']"
            @click="downloadFile(downloadLinks.csv!, 'csv')"
          >
            <v-icon start>
              mdi-file-delimited
            </v-icon>
            <v-progress-circular
              v-if="downloadingFiles['csv']"
              indeterminate
              size="20"
              width="2"
              color="primary"
              class="mr-2"
            />
            <span>CSV</span>
          </v-btn>
        </v-col>
        <v-col
          v-if="downloadLinks.excel"
          cols="auto"
        >
          <v-btn
            color="primary"
            variant="outlined"
            :disabled="downloadingFiles['excel']"
            @click="downloadFile(downloadLinks.excel!, 'xlsx')"
          >
            <v-icon start>
              mdi-microsoft-excel
            </v-icon>
            <v-progress-circular
              v-if="downloadingFiles['excel']"
              indeterminate
              size="20"
              width="2"
              color="primary"
              class="mr-2"
            />
            <span>Excel</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>
  </div>
</template>

<style scoped>
.h-full {
  height: 100%;
}
</style>
