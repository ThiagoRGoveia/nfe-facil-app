<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_FILES } from '@/graphql/history';
import type { FileProcessStatus, FileToProcess } from '@/graphql/generated/graphql';

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

interface FileItem extends FileToProcess {
  id: string;
  fileName: string;
  filePath?: string | null;
  status: FileProcessStatus;
  result?: Record<string, unknown> | null;
  error?: string | null;
}

const props = defineProps<{
  batchId: string;
}>();

const tableOptions = ref<TableOptions>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [{ key: 'fileName', order: 'asc' }],
});

const { load, result, loading, refetch } = useLazyQuery(FIND_ALL_FILES, () => ({
  pagination: {
    page: tableOptions.value.page,
    pageSize: tableOptions.value.itemsPerPage,
  },
  filters: {
    filters: [
      {
        field: 'batchProcess.id',
        value: props.batchId,
      },
    ],
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

const files = computed<FileItem[]>(() => {
  return (result.value?.findAllFiles.items ?? []) as FileItem[];
});

const totalItems = computed(() => result.value?.findAllFiles.total ?? 0);

watch(tableOptions, (args) => {
  console.log('args', args, tableOptions.value);
  if (tableOptions.value.page !== args.page || tableOptions.value.itemsPerPage !== args.itemsPerPage) {
    console.log('refetching');
    refetch();
  }
});

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
    sortable: false,
  },
  {
    title: "Status",
    key: "status",
    align: "center" as const,
    sortable: true,
  },
];



const handleDownload = (event: Event, item: FileItem) => {
  event.stopPropagation();
  // Handle file download here using item.filePath
  console.log("Downloading file:", item.fileName);
};

const handleTableOptionsUpdate = (options: TableOptions) => {
  tableOptions.value = options;
};

onMounted(() => {
  load();
});

</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="files"
    :loading="loading"
    :items-per-page="tableOptions.itemsPerPage"
    :page="tableOptions.page"
    :items-length="totalItems"
    hover
    @update:options="handleTableOptionsUpdate"
  >
    <template #item.download="{ item }">
      <v-tooltip
        activator="parent"
        location="top"
        text="Download file"
      >
        <template #activator="{ props }">
          <v-btn
            density="comfortable"
            icon="mdi-download-circle-outline"
            size="small"
            color="primary"
            v-bind="props"
            @click="(event: Event) => handleDownload(event, item as FileItem)"
          />
        </template>
      </v-tooltip>
    </template>

    <template #item.results="{ item }">
      <span
        v-if="(item as FileItem).error"
        class="text-error"
      >{{ (item as FileItem).error }}</span>
      <span v-else-if="(item as FileItem).result">{{ JSON.stringify((item as FileItem).result) }}</span>
      <span v-else>-</span>
    </template>

    <template #item.status="{ item }">
      <v-chip
        :color="(item as FileItem).status === 'COMPLETED' ? 'success' : (item as FileItem).status === 'FAILED' ? 'error' : 'warning'"
        size="small"
      >
        {{ (item as FileItem).status }}
      </v-chip>
    </template>
  </v-data-table-server>
</template>

<style scoped>
.v-data-table ::v-deep tbody tr {
  cursor: pointer;
}
</style>
