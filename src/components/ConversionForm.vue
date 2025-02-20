<script setup lang="ts">
import { ref } from "vue";
import { FileFormat } from "@/graphql/generated/graphql";
interface Props {
  title: string;
}

defineProps<Props>();

const files = ref<File[]>([]);
const selectedFormats = ref<FileFormat[]>(['JSON']);

const outputFormats = [
  { label: "JSON", value: "JSON" },
  { label: "CSV", value: "CSV" },
  { label: "XLSX", value: "XLSX" },
];

const emit = defineEmits<{
  (e: "submit", data: { files: File[]; formats: FileFormat[] }): void;
}>();

const handleSubmit = () => {
  console.log(selectedFormats.value);
  console.log(files.value);
  if (files.value.length === 0 || selectedFormats.value.length === 0) return;
  
  emit("submit", {
    files: files.value,
    formats: selectedFormats.value,
  });
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
          accept=".pdf,.zip"
          class="mb-6 flex-grow-1"
        />

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

        <v-btn
          type="submit"
          color="primary"
          block
          :disabled="files.length === 0 || selectedFormats.length === 0"
        >
          Extrair dados
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
