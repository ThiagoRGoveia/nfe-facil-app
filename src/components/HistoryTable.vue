<script setup lang="ts">
interface HistoryItem {
  id: number;
  date: string;
  numberOfFiles: number;
  status: string;
  creditsUsed: number;
}

const headers = [
  {
    title: "Date",
    key: "date",
    align: "start" as const,
    sortable: true,
  },
  {
    title: "Number of Files",
    key: "numberOfFiles",
    align: "end" as const,
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
    align: "center" as const,
    sortable: true,
  },
  {
    title: "Credits Used",
    key: "creditsUsed",
    align: "end" as const,
    sortable: true,
  },
];

// Example data - replace with your actual data source
const items = ref<HistoryItem[]>([
  {
    id: 1,
    date: "2024-03-20T10:30:00Z",
    numberOfFiles: 5,
    status: "Completed",
    creditsUsed: 10,
  },
  {
    id: 2,
    date: "2024-03-19T15:45:00Z",
    numberOfFiles: 3,
    status: "Processing",
    creditsUsed: 6,
  },
]);

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleRowClick = (item: HistoryItem) => {
  // Emit the selected item to parent component
  emit("row-click", item);
};

const emit = defineEmits<{
  (e: "row-click", item: HistoryItem): void;
}>();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hover
    @click:row="handleRowClick"
  >
    <template #item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>

    <template #item.status="{ item }">
      <v-chip
        :color="item.status === 'Completed' ? 'success' : 'warning'"
        size="small"
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template #item.creditsUsed="{ item }">
      {{ item.creditsUsed.toFixed(2) }}
    </template>
  </v-data-table>
</template>

<style scoped>
.v-data-table ::v-deep tbody tr {
  cursor: pointer;
}
</style>
