<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PUBLIC_PROCESS_BATCH } from "@/graphql/public";
import { PublicSyncProcessResponse } from "@/graphql/generated/graphql";

interface Props {
  title: string;
}

defineProps<Props>();

const files = ref<File[]>([]);
const selectedFormats = ref<string[]>([]);
const loading = ref(false);
const error = ref("");
const downloadLinks = ref<PublicSyncProcessResponse>({});

const outputFormats = [
  { label: "JSON", value: "json" },
  { label: "CSV", value: "csv" },
  { label: "XLSX", value: "xlsx" },
];

const { mutate: processFiles } = useMutation(PUBLIC_PROCESS_BATCH);

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

const handleSubmit = async () => {
  if (files.value.length === 0 || selectedFormats.value.length === 0) return;

  try {
    loading.value = true;
    error.value = "";
    downloadLinks.value = {};

    const result = await processFiles({
      files: files.value,
      formats: selectedFormats.value,
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
  <v-form
    class="h-full"
    @submit.prevent="handleSubmit"
  >
    <v-card class="pa-4 h-full">
      <v-card-title class="text-h5 mb-4">
        Adicione seus arquivos em formato PDF ou ZIP
      </v-card-title>

      <v-card-text class="d-flex flex-column h-100">
        <FileUploader
          v-model:files="files"
          accept=".xml"
          class="mb-6 flex-grow-1"
        />

        <v-alert
          v-if="error"
          type="error"
          class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-container class="px-0">
          <v-label class="text-subtitle-1 mb-2">
            Escolha os formatos desejados
          </v-label>
          <v-row>
            <v-col
              v-for="format in outputFormats"
              :key="format.value"
              cols="auto"
            >
              <v-checkbox
                v-model="selectedFormats"
                :label="format.label"
                :value="format.value"
                color="primary"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-container
          v-if="Object.keys(downloadLinks).length > 0"
          class="px-0 mb-4"
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

        <v-btn
          type="submit"
          color="primary"
          block
          :loading="loading"
          :disabled="files.length === 0 || selectedFormats.length === 0 || loading"
        >
          {{ loading ? "Processando..." : "Extrair dados" }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<style scoped>
.v-card {
  max-width: 100%;
  margin: 0 auto;
}

.h-full {
  height: 100%;
}

.h-100 {
  height: 100%;
}
</style>
