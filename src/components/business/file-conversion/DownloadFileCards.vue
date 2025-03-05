<script setup lang="ts">
import { computed, ref } from "vue";
import { PublicSyncProcessResponse } from "@/graphql/generated/graphql";
import { 
  FileJson, 
  FileSpreadsheet, 
  FileText, 
  Loader2 
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const props = defineProps<{
  downloadLinks: PublicSyncProcessResponse;
}>();

const downloadingFiles = ref<Record<string, boolean>>({});
const error = ref("");

const emit = defineEmits<{
  (e: "error", message: string): void;
}>();

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
    const errorMessage = e instanceof Error ? e.message : `Failed to download ${format} file`;
    error.value = errorMessage;
    emit("error", errorMessage);
  } finally {
    downloadingFiles.value[format] = false;
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- JSON Card -->
    <Card v-if="downloadLinks.json" class="hover:shadow-md transition-shadow">
      <CardContent class="p-6 flex flex-col items-center">
        <div class="mb-4 text-center">
          <FileJson class="h-20 w-20 mx-auto mb-2 text-primary" />
          <h3 class="text-xl font-semibold">JSON</h3>
        </div>
        <Button 
          class="w-full"
          :disabled="downloadingFiles['json']"
          @click="downloadFile(downloadLinks.json!, 'json')"
        >
          <Loader2 v-if="downloadingFiles['json']" class="mr-2 h-4 w-4 animate-spin" />
          <span>Download JSON</span>
        </Button>
      </CardContent>
    </Card>

    <!-- CSV Card -->
    <Card v-if="downloadLinks.csv" class="hover:shadow-md transition-shadow">
      <CardContent class="p-6 flex flex-col items-center">
        <div class="mb-4 text-center">
          <FileText class="h-20 w-20 mx-auto mb-2 text-primary" />
          <h3 class="text-xl font-semibold">CSV</h3>
        </div>
        <Button 
          class="w-full"
          :disabled="downloadingFiles['csv']"
          @click="downloadFile(downloadLinks.csv!, 'csv')"
        >
          <Loader2 v-if="downloadingFiles['csv']" class="mr-2 h-4 w-4 animate-spin" />
          <span>Download CSV</span>
        </Button>
      </CardContent>
    </Card>

    <!-- Excel Card -->
    <Card v-if="downloadLinks.excel" class="hover:shadow-md transition-shadow">
      <CardContent class="p-6 flex flex-col items-center">
        <div class="mb-4 text-center">
          <FileSpreadsheet class="h-20 w-20 mx-auto mb-2 text-primary" />
          <h3 class="text-xl font-semibold">Excel</h3>
        </div>
        <Button 
          class="w-full"
          :disabled="downloadingFiles['excel']"
          @click="downloadFile(downloadLinks.excel!, 'xlsx')"
        >
          <Loader2 v-if="downloadingFiles['excel']" class="mr-2 h-4 w-4 animate-spin" />
          <span>Download Excel</span>
        </Button>
      </CardContent>
    </Card>
  </div>
</template> 