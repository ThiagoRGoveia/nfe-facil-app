<script setup lang="ts">
interface Props {
  title: string;
}

const props = defineProps<Props>();

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
  <v-form @submit.prevent="handleSubmit">
    <v-card class="pa-4">
      <v-card-title class="text-h5 mb-4">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <FileUploader v-model:files="files" accept=".xml" class="mb-6" />

        <v-container class="px-0">
          <v-label class="text-subtitle-1 mb-2">Output Formats</v-label>
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
          Convert Files
        </v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<style scoped>
.v-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
