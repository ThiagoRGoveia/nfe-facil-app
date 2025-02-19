<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_BATCH_PROCESSES } from '@/graphql/history';
import type { PaginatedBatchProcessResponse } from '@/graphql/generated/graphql';

interface HistoryItem {
  id: string;
  status: string;
  totalFiles: number;
  processedFiles: number;
  createdAt: string;
}

interface TableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: Array<{
    key: string;
    order: 'asc' | 'desc';
  }>;
  groupBy?: Array<string>;
  search?: string;
}

const tableOptions = ref<TableOptions>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [{ key: 'createdAt', order: 'desc' }],
});

const { load, result, loading, refetch } = useLazyQuery<{ findAllBatchProcesses: PaginatedBatchProcessResponse }>(
  FIND_ALL_BATCH_PROCESSES,
  () => ({
    pagination: {
      page: tableOptions.value.page,
      pageSize: tableOptions.value.itemsPerPage,
    },
    sort: tableOptions.value.sortBy[0] ? {
      field: tableOptions.value.sortBy[0].key,
      direction: tableOptions.value.sortBy[0].order.toUpperCase(),
    } : undefined,
  }),
  {
    debounce: 1000,
    keepPreviousResult: true,
    fetchPolicy: 'cache-first'
  }
);

const items = computed(() => {
  const batchProcesses = result.value?.findAllBatchProcesses.items ?? [];
  return batchProcesses.map(item => ({
    id: item.id,
    status: item.status,
    totalFiles: item.totalFiles,
    processedFiles: item.processedFiles,
    createdAt: item.createdAt ?? new Date().toISOString(),
  }));
});

const totalItems = computed(() => result.value?.findAllBatchProcesses.total ?? 0);

const headers = [
  {
    title: "Date",
    key: "createdAt",
    align: "start" as const,
    sortable: true,
  },
  {
    title: "Number of Files",
    key: "totalFiles",
    align: "end" as const,
    sortable: true,
  },
  {
    title: "Processed Files",
    key: "processedFiles",
    align: "end" as const,
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
    align: "center" as const,
    sortable: true,
  },
];

const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const selectedItem = ref<HistoryItem | null>(null);
const showDialog = ref(false);

const handleRowClick = (...args: [Event, { item: HistoryItem }]) => {
  const { item } = args[1];
  selectedItem.value = item;
  showDialog.value = true;
  emit("row-click", item);
};

const handleUpdate = (options: TableOptions) => {
  tableOptions.value = options;
};

watch(tableOptions, () => {
  refetch();
});

onMounted(() => {
  load();
});

const emit = defineEmits<{
  (e: "row-click", item: HistoryItem): void;
}>();
</script>

<template>
  <div>
    <v-data-table-server
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="tableOptions.itemsPerPage"
      :page="tableOptions.page"
      :items-length="totalItems"
      hover
      @click:row="handleRowClick"
      @update:options="handleUpdate"
    >
      <template #item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template #item.status="{ item }">
        <v-chip
          :color="item.status === 'COMPLETED' ? 'success' : item.status === 'FAILED' ? 'error' : 'warning'"
          size="small"
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table-server>

    <v-dialog
      v-model="showDialog"
      max-width="1200"
    >
      <v-card>
        <v-card-title class="d-flex align-center">
          <span>Files for Process {{ selectedItem?.id }}</span>
          <v-spacer />
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="showDialog = false"
          />
        </v-card-title>
        <v-card-text>
          <FilesTable
            v-if="selectedItem"
            :batch-id="selectedItem.id"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.v-data-table ::v-deep tbody tr {
  cursor: pointer;
}
</style>
