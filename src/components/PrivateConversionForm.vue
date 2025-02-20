<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PROCESS_BATCH_SYNC } from "@/graphql/private";
import ConversionForm from "./ConversionForm.vue";

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
  <div class="h-full">
    <ConversionForm
      title="Conversão Privada de Arquivos"
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
            @click="downloadFile(downloadLinks.json!, 'json')"
          >
            <v-icon start>
              mdi-code-json
            </v-icon>
            JSON
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
            @click="downloadFile(downloadLinks.csv!, 'csv')"
          >
            <v-icon start>
              mdi-file-delimited
            </v-icon>
            CSV
          </v-btn>
        </v-col>
        <v-col
          v-if="downloadLinks.excel"
          cols="auto"
        >
          <v-btn
            color="primary"
            variant="outlined"
            @click="downloadFile(downloadLinks.excel!, 'xlsx')"
          >
            <v-icon start>
              mdi-microsoft-excel
            </v-icon>
            Excel
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