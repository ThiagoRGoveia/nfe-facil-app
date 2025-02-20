<script setup lang="ts">
interface Props {
  maxFiles?: number;
  accept?: string;
}

withDefaults(defineProps<Props>(), {
  maxFiles: 20,
  accept: ".pdf,.zip",
});

const files = ref<File[]>([]);

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();

const onFilesChanged = () => {
  emit("update:files", files.value);
};

// const clearFiles = () => {
//   files.value = [];
//   onFilesChanged();
// };

const hasFiles = computed(() => files.value.length > 0);
const filesCount = computed(() => files.value.length);

const dropZoneText = computed(() => {
  if (!hasFiles.value) {
    return "Drop files here or click to upload";
  }
  return `${filesCount.value} file${
    filesCount.value === 1 ? "" : "s"
  } selected`;
});
</script>

<template>
  <v-file-input
    v-model="files"
    :accept="accept"
    :max-files="maxFiles"
    multiple
    clearable
    chips
    counter
    show-size
    truncate-length="25"
    class="file-uploader"
    :class="{ 'has-files': hasFiles }"
    @update:model-value="onFilesChanged"
  >
    <template #prepend>
      <v-icon
        color="primary"
        size="large"
      >
        mdi-cloud-upload
      </v-icon>
    </template>

    <template #selection="{ fileNames }">
      <template
        v-for="fileName in fileNames"
        :key="fileName"
      >
        <v-chip
          size="small"
          label
          color="primary"
          variant="outlined"
          class="me-2"
        >
          {{ fileName }}
        </v-chip>
      </template>
    </template>

    <template #default="{ isActive }">
      <div
        class="drop-zone"
        :class="{ 'drop-zone--active': isActive }"
      >
        <div class="text-center">
          <v-icon
            size="48"
            color="primary"
            class="mb-3"
          >
            mdi-cloud-upload-outline
          </v-icon>
          <div class="text-h6">
            {{ dropZoneText }}
          </div>
          <div class="text-body-2 text-medium-emphasis">
            Máximo de {{ maxFiles }} arquivos ({{ accept }} apenas)
          </div>
        </div>
      </div>
    </template>
  </v-file-input>
</template>

<style scoped>
.file-uploader {
  --drop-zone-height: 300px;
}

.file-uploader :deep(.v-field__input) {
  min-height: var(--drop-zone-height) !important;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

.file-uploader.has-files :deep(.v-field__input) {
  min-height: unset !important;
}

.drop-zone {
  width: 100%;
  padding: 24px;
  transition: all 0.2s ease-in-out;
}

.drop-zone--active {
  background-color: rgb(var(--v-theme-primary) / 0.05);
  border-radius: 4px;
}

.v-chip {
  max-width: 200px;
}
</style>
