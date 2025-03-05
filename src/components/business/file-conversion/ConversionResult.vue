<script setup lang="ts">
import { computed } from "vue";
import { PublicSyncProcessResponse } from "@/graphql/generated/graphql";
import DownloadFileCards from "./DownloadFileCards.vue";
import FileErrorsDisplay from "./FileErrorsDisplay.vue";
import { AlertTriangle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

interface FileError {
  fileName: string;
  error: string;
}

interface Props {
  // Download links - works with both base64 encoded content and URLs
  downloadLinks: PublicSyncProcessResponse | Record<string, string | null | undefined>;
  // File errors to display
  errors: FileError[];
  // Optional loading state
  loading?: boolean;
  // Optional general error message
  errorMessage?: string;
  // Custom reset button text
  resetButtonText?: string;
  // Whether to hide the reset button
  hideResetButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  errorMessage: "",
  resetButtonText: "Converter novo arquivo",
  hideResetButton: false
});

// Emit events for error handling, downloading files, and resetting
const emit = defineEmits<{
  (e: "error", message: string): void;
  (e: "reset"): void;
}>();

// Computed properties to determine what to display
const hasLinks = computed(() => {
  return Object.values(props.downloadLinks).some(link => link !== null && link !== undefined);
});

const shouldShowErrors = computed(() => {
  return props.errors.length > 0 || !hasLinks.value;
});

const handleDownloadError = (message: string) => {
  emit("error", message);
};

const handleReset = () => {
  emit("reset");
};
</script>

<template>
  <div>
    <!-- Different heading based on whether we have links or just errors -->
    <h2 class="text-2xl font-bold mb-6">
      {{ hasLinks ? 'Arquivos convertidos' : 'Resultado do processamento' }}
    </h2>
    
    <!-- Show download cards if we have links -->
    <DownloadFileCards 
      v-if="hasLinks" 
      :downloadLinks="downloadLinks"
      @error="handleDownloadError"
    />
    
    <!-- Show error display if we have errors -->
    <FileErrorsDisplay 
      :errors="errors"
      v-if="shouldShowErrors"
    />
    
    <!-- Show message if both links and errors are null but we have an error message -->
    <div v-if="!hasLinks && errors.length === 0 && errorMessage" class="text-center py-8">
      <AlertTriangle class="h-16 w-16 text-destructive mx-auto mb-3" />
      <p class="text-lg font-medium text-destructive">{{ errorMessage }}</p>
    </div>
    
    <!-- Try again button -->
    <div v-if="!hideResetButton" class="mt-8 flex justify-center">
      <Button 
        variant="outline"
        @click="handleReset"
        class="px-8"
      >
        {{ resetButtonText }}
      </Button>
    </div>
  </div>
</template> 