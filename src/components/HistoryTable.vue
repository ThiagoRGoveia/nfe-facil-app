<script setup lang="ts">
import { ref, computed,  onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_BATCH_PROCESSES } from '@/graphql/history';
import type { BatchStatus, PaginatedBatchProcessResponse } from '@/graphql/generated/graphql';
import FilesTable from '@/components/FilesTable.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from 'lucide-vue-next';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';

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

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);

// Skeleton row count for loading state
const skeletonRowCount = 5;

// Sorting state
const sortColumn = ref('createdAt');
const sortDirection = ref<'asc' | 'desc'>('desc');

// Computed tableOptions for API call compatibility
const tableOptions = computed<TableOptions>(() => ({
  page: currentPage.value,
  itemsPerPage: pageSize.value,
  sortBy: [{ key: sortColumn.value, order: sortDirection.value }],
}));

const { load, result, loading } = useLazyQuery<{ findAllBatchProcesses: PaginatedBatchProcessResponse }>(
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

const itemsComputed = computed(() => {
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
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const columns = [
  {
    title: "Data",
    key: "createdAt",
    sortable: true,
  },
  {
    title: "Número de Arquivos",
    key: "totalFiles",
    sortable: true,
  },
  {
    title: "Arquivos Processados",
    key: "processedFiles",
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
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

const getBadgeVariant = (status: BatchStatus) => {
  switch(status) {
    case 'COMPLETED': return 'secondary';
    case 'FAILED': return 'destructive';
    case 'PROCESSING': return 'default';
    case 'CANCELLED': return 'destructive';
    case 'CREATED': return 'default';
    default: return 'default';
  }
};

const getStatusLabel = (status: BatchStatus) => {
  switch(status) {
    case 'COMPLETED': return 'Concluído';
    case 'FAILED': return 'Falhou';
    case 'PROCESSING': return 'Processando';
    case 'CANCELLED': return 'Cancelado';
    case 'CREATED': return 'Criado';
    default: return status;
  }
};

const getSortIcon = (columnKey: string) => {
  if (sortColumn.value !== columnKey) return ChevronsUpDown;
  return sortDirection.value === 'asc' ? ChevronUp : ChevronDown;
};

const toggleSort = (columnKey: string) => {
  if (sortColumn.value === columnKey) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = columnKey;
    sortDirection.value = 'asc';
  }
};

const selectedItem = ref<HistoryItem | null>(null);
const showDialog = ref(false);
const filesTableLoaded = ref(false);

const handleRowClick = (item: HistoryItem) => {
  selectedItem.value = item;
  showDialog.value = true;
  filesTableLoaded.value = false;
  emit("row-click", item);
};

// For pagination
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  load();
});

// Function to mark the files table as loaded
const onFilesTableMounted = () => {
  filesTableLoaded.value = true;
};

const emit = defineEmits<{
  (e: "row-click", item: HistoryItem): void;
}>();
</script>

<template>
  <div class="relative min-h-[400px]">
    <Table>
      <TableCaption v-if="itemsComputed.length === 0 && !loading">
        Nenhum item encontrado
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="column in columns"
            :key="column.key"
            :class="{ 'cursor-pointer': column.sortable }"
            @click="column.sortable && toggleSort(column.key)"
          >
            <div class="flex items-center gap-1">
              {{ column.title }}
              <component
                :is="getSortIcon(column.key)"
                v-if="column.sortable"
                class="h-4 w-4"
              />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- Loading skeleton -->
        <template v-if="loading && itemsComputed.length === 0">
          <TableRow
            v-for="i in skeletonRowCount"
            :key="`skeleton-${i}`"
            class="hover:bg-muted/50"
          >
            <TableCell>
              <Skeleton class="h-4 w-[180px]" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-[80px]" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-[80px]" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-6 w-24" />
            </TableCell>
          </TableRow>
        </template>
        
        <!-- Actual data -->
        <TableRow 
          v-for="item in itemsComputed"
          v-else-if="!loading" 
          :key="item.id" 
          class="cursor-pointer hover:bg-muted/50"
          @click="handleRowClick(item)"
        >
          <TableCell>{{ formatDate(item.createdAt) }}</TableCell>
          <TableCell>{{ item.totalFiles }}</TableCell>
          <TableCell>{{ item.processedFiles }}</TableCell>
          <TableCell>
            <Badge :variant="getBadgeVariant(item.status)">
              {{ getStatusLabel(item.status) }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        Mostrando {{ itemsComputed.length > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} até 
        {{ Math.min(currentPage * pageSize, totalItems) }} de {{ totalItems }} entradas
      </div>
      
      <!-- New pagination component -->
      <Pagination
        v-if="totalPages > 0"
        v-slot="{ page }"
        :items-per-page="pageSize"
        :total="totalItems"
        :sibling-count="1"
        show-edges
        :default-page="currentPage"
        @update:page="handlePageChange"
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1"
        >
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-9 h-9 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis
              v-else
              :key="item.type"
              :index="index"
            />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>

    <Dialog v-model:open="showDialog">
      <DialogContent class="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Arquivos processados</DialogTitle>
        </DialogHeader>
        <FilesTable
          v-if="selectedItem"
          :batch-id="selectedItem.id"
          @vue:mounted="onFilesTableMounted"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
