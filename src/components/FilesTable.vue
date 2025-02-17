<script setup lang="ts">
interface FileItem {
  id: number;
  fileName: string;
  downloadUrl: string;
  results: string;
  status: string;
}

const headers = [
  {
    title: "File Name",
    key: "fileName",
    align: "start" as const,
    sortable: true,
  },
  {
    title: "Download",
    key: "download",
    align: "center" as const,
    sortable: false,
  },
  {
    title: "Results",
    key: "results",
    align: "start" as const,
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
    align: "center" as const,
    sortable: true,
  },
];

// Example data - replace with your actual data source
const items = ref<FileItem[]>([
  {
    id: 1,
    fileName: "invoice_001.xml",
    downloadUrl: "/files/invoice_001.xml",
    results: "Successfully processed",
    status: "Completed",
  },
  {
    id: 2,
    fileName: "invoice_002.xml",
    downloadUrl: "/files/invoice_002.xml",
    results: "Validation in progress",
    status: "Processing",
  },
]);

const handleRowClick = (item: FileItem) => {
  emit("row-click", item);
};

const handleDownload = (event: Event, item: FileItem) => {
  event.stopPropagation(); // Prevent row click when clicking download button
  // Handle file download here
  console.log("Downloading file:", item.fileName);
};

const emit = defineEmits<{
  (e: "row-click", item: FileItem): void;
}>();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hover
    @click:row="handleRowClick"
  >
    <template #item.download="{ item }">
      <v-btn
        icon="mdi-download"
        size="small"
        color="primary"
        @click="(event: Event) => handleDownload(event, item)"
      >
        <v-tooltip activator="parent" location="top">
          Download {{ item.fileName }}
        </v-tooltip>
      </v-btn>
    </template>

    <template #item.status="{ item }">
      <v-chip
        :color="item.status === 'Completed' ? 'success' : 'warning'"
        size="small"
      >
        {{ item.status }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<style scoped>
.v-data-table ::v-deep tbody tr {
  cursor: pointer;
}
</style>
