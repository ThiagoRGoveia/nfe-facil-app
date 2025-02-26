<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_BATCH_PROCESSES } from '@/graphql/history';
import type { PaginatedBatchProcessResponse } from '@/graphql/generated/graphql';
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
  X as XIcon
} from 'lucide-vue-next';

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

// Sorting state
const sortColumn = ref('createdAt');
const sortDirection = ref<'asc' | 'desc'>('desc');

// Computed tableOptions for API call compatibility
const tableOptions = computed<TableOptions>(() => ({
  page: currentPage.value,
  itemsPerPage: pageSize.value,
  sortBy: [{ key: sortColumn.value, order: sortDirection.value }],
}));

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
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const columns = [
  {
    title: "Date",
    key: "createdAt",
    sortable: true,
  },
  {
    title: "Number of Files",
    key: "totalFiles",
    sortable: true,
  },
  {
    title: "Processed Files",
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

const getBadgeVariant = (status: string) => {
  switch(status) {
    case 'COMPLETED': return 'secondary';
    case 'FAILED': return 'destructive';
    default: return 'default';
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

const handleRowClick = (item: HistoryItem) => {
  selectedItem.value = item;
  showDialog.value = true;
  emit("row-click", item);
};

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

watch(tableOptions, () => {
  refetch();
}, { deep: true });

onMounted(() => {
  load();
});

const emit = defineEmits<{
  (e: "row-click", item: HistoryItem): void;
}>();
</script>

<template>
  <div>
    <Table>
      <TableCaption v-if="items.length === 0 && !loading">
        No history items found
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead v-for="column in columns" :key="column.key" :class="{ 'cursor-pointer': column.sortable }" @click="column.sortable && toggleSort(column.key)">
            <div class="flex items-center gap-1">
              {{ column.title }}
              <component :is="getSortIcon(column.key)" v-if="column.sortable" class="h-4 w-4" />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="loading" class="h-24">
          <TableCell :colspan="columns.length" class="text-center">
            Loading...
          </TableCell>
        </TableRow>
        <TableRow 
          v-for="item in items" 
          :key="item.id" 
          @click="handleRowClick(item)"
          class="cursor-pointer hover:bg-muted/50"
        >
          <TableCell>{{ formatDate(item.createdAt) }}</TableCell>
          <TableCell>{{ item.totalFiles }}</TableCell>
          <TableCell>{{ item.processedFiles }}</TableCell>
          <TableCell>
            <Badge :variant="getBadgeVariant(item.status)">
              {{ item.status }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        Showing {{ items.length > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} to 
        {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} entries
      </div>
      <div v-if="totalPages > 1" class="flex items-center gap-1">
        <Button 
          variant="outline" 
          size="sm"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </Button>
        
        <div v-if="totalPages <= 5">
          <Button 
            v-for="page in totalPages" 
            :key="page"
            size="sm"
            :variant="currentPage === page ? 'default' : 'outline'"
            @click="goToPage(page)"
          >
            {{ page }}
          </Button>
        </div>
        
        <div v-else>
          <!-- First page always visible -->
          <Button 
            size="sm"
            :variant="currentPage === 1 ? 'default' : 'outline'"
            @click="goToPage(1)"
          >
            1
          </Button>
          
          <!-- Ellipsis if needed -->
          <span v-if="currentPage > 3" class="mx-1">...</span>
          
          <!-- Pages around current -->
          <template v-for="(page, index) in [
            Math.max(2, currentPage - 1), 
            currentPage !== 1 && currentPage !== totalPages ? currentPage : null, 
            Math.min(totalPages - 1, currentPage + 1)
          ]" :key="index">
            <Button 
              v-if="page !== null"
              size="sm"
              :variant="currentPage === page ? 'default' : 'outline'"
              @click="goToPage(page)"
            >
              {{ page }}
            </Button>
          </template>
          
          <!-- Ellipsis if needed -->
          <span v-if="currentPage < totalPages - 2" class="mx-1">...</span>
          
          <!-- Last page always visible -->
          <Button 
            size="sm"
            :variant="currentPage === totalPages ? 'default' : 'outline'"
            @click="goToPage(totalPages)"
          >
            {{ totalPages }}
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </Button>
      </div>
    </div>

    <Dialog v-model:open="showDialog">
      <DialogContent class="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Files for Process {{ selectedItem?.id }}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            @click="showDialog = false"
            class="absolute right-4 top-4"
          >
            <XIcon class="h-4 w-4" />
          </Button>
        </DialogHeader>
        <FilesTable
          v-if="selectedItem"
          :batch-id="selectedItem.id"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
