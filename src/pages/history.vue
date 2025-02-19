<script setup lang="ts">
import { ref } from "vue";

interface BatchProcess {
  id: string;
  status: string;
  totalFiles: number;
  processedFiles: number;
  createdAt: string;
}

const selectedProcess = ref<BatchProcess | null>(null);

const handleRowClick = (item: BatchProcess) => {
  selectedProcess.value = item;
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold">
        Processing History
      </h1>
      <p class="text-gray-600">
        View and manage your file processing history
      </p>
    </div>

    <v-row>
      <v-col :cols="12">
        <v-card>
          <v-card-title>Processing History</v-card-title>
          <v-card-text>
            <HistoryTable @row-click="handleRowClick" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template> 