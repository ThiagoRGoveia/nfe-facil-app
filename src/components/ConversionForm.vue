<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();

const files = ref<File[]>([]);
const selectedFormats = ref<string[]>([]);

const outputFormats = [
  { label: "JSON", value: "json" },
  { label: "CSV", value: "csv" },
  { label: "XLSX", value: "xlsx" },
];

const emit = defineEmits<{
  (e: "submit", data: { files: File[]; formats: string[] }): void;
}>();

const handleSubmit = () => {
  emit("submit", {
    files: files.value,
    formats: selectedFormats.value,
  });
};
</script>

<template>
  <v-form @submit.prevent="handleSubmit" class="h-full">
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
