<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CloudUpload, X } from 'lucide-vue-next';

interface Props {
  maxFiles?: number;
  accept?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 20,
  accept: ".pdf,.zip",
});

const fileInput = useTemplateRef<typeof Input>('fileInput');
const dragActive = ref(false);

const emit = defineEmits<{
  (e: "update:files", files: File[]): void;
}>();

const files = ref<File[]>([]);

const onFilesChanged = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    // Convert FileList to Array and append to existing files
    const newFiles = Array.from(input.files);
    
    // Check if adding these files would exceed maxFiles
    if (files.value.length + newFiles.length > props.maxFiles) {
      alert(`You can only upload a maximum of ${props.maxFiles} files.`);
      return;
    }
    
    files.value = [...files.value, ...newFiles];
    emit("update:files", files.value);
  }
};

const removeFile = (index: number) => {
  files.value = files.value.filter((_, i) => i !== index);
  emit("update:files", files.value);
};

const clearFiles = () => {
  files.value = [];
  emit("update:files", files.value);
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.inputRef.click()
  }
};

const hasFiles = computed(() => files.value.length > 0);
const filesCount = computed(() => files.value.length);

const dropZoneText = computed(() => {
  if (!hasFiles.value) {
    return "Arraste e solte ou clique para fazer upload";
  }
  return `${filesCount.value} arquivo${
    filesCount.value === 1 ? "" : "s"
  } selecionado${
    filesCount.value === 1 ? "" : "s"
  }`;
});

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<template>
  <div class="file-uploader w-full">
    <div 
      class="drop-zone border-2 border-dashed rounded-lg p-6 transition-colors" 
      :class="{ 
        'border-primary/50 bg-primary/5': dragActive,
        'border-muted-foreground/25 hover:border-primary/50': !dragActive 
      }"
    >
      <Input 
        ref="fileInput"
        type="file" 
        :accept="accept" 
        multiple 
        class="hidden" 
        @change="onFilesChanged"
      />
      
      <div
        v-if="!hasFiles"
        class="flex flex-col items-center justify-center space-y-4 py-12"
      >
        <CloudUpload class="h-12 w-12 text-primary" />
        <div class="text-xl font-medium">
          {{ dropZoneText }}
        </div>
        <div class="text-sm text-muted-foreground">
          Máximo de {{ maxFiles }} arquivos (apenas {{ accept }})
        </div>
        <Button 
          variant="outline" 
          type="button" 
          @click="triggerFileInput"
        >
          Selecionar Arquivos
        </Button>
      </div>
      
      <div
        v-else
        class="space-y-4"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="text-xl font-medium">
            {{ dropZoneText }}
          </div>
          <div class="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              @click="triggerFileInput"
            >
              Adicionar Mais
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              type="button" 
              @click="clearFiles"
            >
              Limpar Tudo
            </Button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div 
            v-for="(file, index) in files" 
            :key="index"
            class="flex items-center gap-2 bg-muted/30 rounded-md p-2"
          >
            <Badge
              variant="outline"
              class="text-xs truncate max-w-[200px]"
            >
              {{ file.name }}
            </Badge>
            <span class="text-xs text-muted-foreground">
              {{ formatFileSize(file.size) }}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              class="h-6 w-6 ml-auto" 
              @click="removeFile(index)"
            >
              <X class="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-uploader {
  width: 100%;
}

.drop-zone {
  min-height: 300px;
  width: 100%;
}
</style>
