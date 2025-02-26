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

// Sorting state
const sortColumn = ref('fileName');
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
  debounce: 1000,
  keepPreviousResult: true,
  fetchPolicy: 'cache-first'
});

const files = computed<FileItem[]>(() => {
  return (result.value?.findAllFiles.items ?? []) as FileItem[];
});

const totalItems = computed(() => result.value?.findAllFiles.total ?? 0);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

watch(tableOptions, () => {
  refetch();
}, { deep: true });

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

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

onMounted(() => {
  load();
});
</script>

<template>
  <div>
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
        <TableRow
          v-if="loading"
          class="h-24"
        >
          <TableCell
            :colspan="columns.length"
            class="text-center"
          >
            Carregando...
          </TableCell>
        </TableRow>
        <TableRow 
          v-for="item in files" 
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
              {{ item.status }}
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
      <div
        v-if="totalPages > 1"
        class="flex items-center gap-1"
      >
        <Button 
          variant="outline" 
          size="sm"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Anterior
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
          <span
            v-if="currentPage > 3"
            class="mx-1"
          >...</span>
          
          <!-- Pages around current -->
          <template
            v-for="(page, index) in [
              Math.max(2, currentPage - 1), 
              currentPage !== 1 && currentPage !== totalPages ? currentPage : null, 
              Math.min(totalPages - 1, currentPage + 1)
            ]"
            :key="index"
          >
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
          <span
            v-if="currentPage < totalPages - 2"
            class="mx-1"
          >...</span>
          
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
          Próximo
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
