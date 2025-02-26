<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_FILES } from '@/graphql/history';
import type { FileProcessStatus, FileToProcess } from '@/graphql/generated/graphql';
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
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
} from 'lucide-vue-next';

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

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);

// Skeleton row count for loading state
const skeletonRowCount = 10;

// Sorting state
const sortColumn = ref('createdAt');
const sortDirection = ref<'asc' | 'desc'>('asc');

// Computed tableOptions for API call compatibility
const tableOptions = computed<TableOptions>(() => ({
  page: currentPage.value,
  itemsPerPage: pageSize.value,
  sortBy: [{ key: sortColumn.value, order: sortDirection.value }],
}));

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
    keepPreviousResult: true,
    prefetch: false,
    fetchPolicy: 'cache-first'
  });

const files = computed<FileItem[]>(() => {
  return (result.value?.findAllFiles.items ?? []) as FileItem[];
});

const totalItems = computed(() => result.value?.findAllFiles.total ?? 0);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const columns = [
  {
    title: "Nome do Arquivo",
    key: "fileName",
    sortable: true,
  },
  {
    title: "Download",
    key: "download",
    sortable: false,
  },
  {
    title: "Resultados",
    key: "results",
    sortable: false,
  },
  {
    title: "Status",  
    key: "status",
    sortable: true,
  },
];

const getBadgeVariant = (status: FileProcessStatus) => {
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

const handleDownload = (event: Event, item: FileItem) => {
  event.stopPropagation();
  // Handle file download here using item.filePath
  console.log("Downloading file:", item.fileName);
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const getStatusLabel = (status: FileProcessStatus) => {
  switch(status) {
    case 'COMPLETED': return 'Concluído';
    case 'FAILED': return 'Falhou';
    case 'PENDING': return 'Pendente';
    case 'PROCESSING': return 'Processando';
    default: return status;
  }
};

onMounted(() => {
  load();
});
</script>

<template>
  <div class="relative min-h-[400px]">
    <Table>
      <TableCaption v-if="files.length === 0 && !loading">
        Nenhum arquivo encontrado
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
        <template v-if="loading">
          <TableRow
            v-for="i in skeletonRowCount"
            :key="`skeleton-${i}`"
            class="hover:bg-muted/50"
          >
            <TableCell class="w-[100px]">
              <Skeleton class="h-4 w-[100px]" />
            </TableCell>
            <TableCell class="text-center">
              <Skeleton class="h-8 w-8 mx-auto rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-4 w-full" />
            </TableCell>
            <TableCell class="text-center">
              <Skeleton class="h-6 w-24 mx-auto" />
            </TableCell>
          </TableRow>
        </template>
        
        <!-- Actual data -->
        <TableRow 
          v-for="item in files"
          v-else-if="!loading" 
          :key="item.id"
          class="hover:bg-muted/50"
        >
          <TableCell>{{ item.fileName }}</TableCell>
          <TableCell class="text-center">
            <Button 
              variant="outline" 
              size="icon"
              title="Baixar arquivo"
              @click="(event) => handleDownload(event, item)"
            >
              <Download class="h-4 w-4" />
            </Button>
          </TableCell>
          <TableCell>
            <span
              v-if="item.error"
              class="text-destructive"
            >{{ item.error }}</span>
            <span v-else-if="item.result">{{ JSON.stringify(item.result) }}</span>
            <span v-else>-</span>
          </TableCell>
          <TableCell class="text-center">
            <Badge :variant="getBadgeVariant(item.status)">
              {{ getStatusLabel(item.status) }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        Mostrando {{ files.length > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} até 
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
  </div>
</template>

<style scoped>
</style>
