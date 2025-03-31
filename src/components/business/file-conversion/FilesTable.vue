<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useLazyQuery, useMutation } from '@vue/apollo-composable';
import { FIND_ALL_FILES, PROCESS_FILE } from '@/graphql/history';
import type { FileProcessStatus, FileRecord } from '@/graphql/generated/graphql';
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
  Eye,
  Loader2,
  RotateCw,
} from 'lucide-vue-next';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogScrollContent,
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

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

interface FileItem extends FileRecord {
  id: string;
  fileName: string;
  filePath?: string | null;
  status: FileProcessStatus;
  result?: Record<string, unknown> | null;
  error?: string | null;
}

const props = defineProps<{
  batchId: string;
  refreshTrigger?: number;
}>();

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);

// Skeleton row count for loading state
const skeletonRowCount = 10;

// Sorting state
const sortColumn = ref('createdAt');
const sortDirection = ref<'asc' | 'desc'>('asc');

// Dialog state
const isDialogOpen = ref(false);
const selectedFile = ref<FileItem | null>(null);
const formattedJson = ref<string>('');

// Download state
const downloadingFile = ref<Record<string, boolean>>({});
const downloadError = ref<string | null>(null);

// Processing retry state
const processingFile = ref<Record<string, boolean>>({});
const processingError = ref<string | null>(null);
const showConfirmDialog = ref(false);
const fileToRetry = ref<FileItem | null>(null);

const emit = defineEmits<{
  (e: "error", message: string): void;
}>();

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
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

const files = computed<FileItem[]>(() => {
  return (result.value?.findAllFiles.items ?? []) as FileItem[];
});

const totalItems = computed(() => result.value?.findAllFiles.total ?? 0);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const { mutate: retryProcessFile } = useMutation(PROCESS_FILE);

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
  {
    title: "Ações",
    key: "actions",
    sortable: false,
  },
];

const getBadgeVariant = (status: FileProcessStatus) => {
  switch(status) {
    case 'COMPLETED': return 'secondary';
    case 'FAILED': return 'destructive';
    case 'PENDING': return 'default';
    case 'PROCESSING': return 'default';
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

const handleDownload = async (event: Event, item: FileItem) => {
  event.stopPropagation();
  
  if (!item.filePath) {
    downloadError.value = "Arquivo não disponível para download";
    emit("error", downloadError.value);
    return;
  }
  
  try {
    downloadingFile.value[item.id] = true;
    const response = await fetch(item.filePath);
    
    if (!response.ok) {
      throw new Error(`Falha ao baixar ${item.fileName}`);
    }
    
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = item.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : `Falha ao baixar ${item.fileName}`;
    downloadError.value = errorMessage;
    emit("error", errorMessage);
  } finally {
    downloadingFile.value[item.id] = false;
  }
};

const handleRowClick = (item: FileItem) => {
  selectedFile.value = item;
  
  if (item.result) {
    try {
      // If result is already an object, stringify it with indentation
      if (typeof item.result === 'object') {
        formattedJson.value = JSON.stringify(item.result, null, 2);
      } else {
        // If it's a string, parse it and then stringify with indentation
        const parsed = JSON.parse(String(item.result));
        formattedJson.value = JSON.stringify(parsed, null, 2);
      }
    } catch (_error) {
      // Fallback to raw result if parsing fails
      formattedJson.value = String(item.result);
    }
  } else {
    formattedJson.value = '';
  }
  
  isDialogOpen.value = true;
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

const handleRetryClick = (event: Event, item: FileItem) => {
  event.stopPropagation();
  fileToRetry.value = item;
  showConfirmDialog.value = true;
};

const handleRetry = async () => {
  if (!fileToRetry.value) return;
  
  try {
    const fileId = fileToRetry.value.id;
    processingFile.value[fileId] = true;
    await retryProcessFile({ fileId });
    
    // Refetch the files list after processing
    await refetch();
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : `Falha ao reprocessar ${fileToRetry.value.fileName}`;
    processingError.value = errorMessage;
    emit("error", errorMessage);
  } finally {
    if (fileToRetry.value) {
      processingFile.value[fileToRetry.value.id] = false;
    }
    // Close the dialog and reset the selected file
    showConfirmDialog.value = false;
    fileToRetry.value = null;
  }
};

// Watch for changes to the refresh trigger and reload data when it changes
watch(() => props.refreshTrigger, () => {
  if (props.refreshTrigger) {
    refetch();
  }
});

// Watch for changes in pagination or sorting
watch([currentPage, pageSize, sortColumn, sortDirection], () => {
  refetch();
});

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
            <TableCell class="text-center">
              <Skeleton class="h-8 w-8 mx-auto rounded-md" />
            </TableCell>
          </TableRow>
        </template>
        
        <!-- Actual data -->
        <TableRow 
          v-for="item in files"
          v-else-if="!loading" 
          :key="item.id"
          class="hover:bg-muted/50 cursor-pointer"
          @click="handleRowClick(item)"
        >
          <TableCell class="text-center">
            {{ item.fileName }}
          </TableCell>
          <TableCell class="text-center">
            <Button 
              variant="outline" 
              size="icon"
              title="Baixar arquivo"
              :disabled="downloadingFile[item.id]"
              @click="(event) => handleDownload(event, item)"
            >
              <Download
                v-if="!downloadingFile[item.id]"
                class="h-4 w-4"
              />
              <Loader2
                v-else
                class="h-4 w-4 animate-spin"
              />
            </Button>
          </TableCell>
          <TableCell class="text-center">
            <span
              v-if="item.error"
              class="text-destructive"
            >{{ item.error }}</span>
            <span
              v-else-if="item.result"
              class="flex justify-center"
            >
              <Eye
                class="h-5 w-5 text-muted-foreground hover:text-foreground"
                title="Visualizar resultado completo"
              />
            </span>
            <span v-else>-</span>
          </TableCell>
          <TableCell class="text-center">
            <Badge :variant="getBadgeVariant(item.status)">
              {{ getStatusLabel(item.status) }}
            </Badge>
          </TableCell>
          <TableCell class="text-center">
            <Button 
              variant="outline" 
              size="icon"
              title="Reprocessar arquivo"
              :disabled="processingFile[item.id]"
              @click="(event) => handleRetryClick(event, item)"
            >
              <RotateCw
                v-if="!processingFile[item.id]"
                class="h-4 w-4"
              />
              <Loader2
                v-else
                class="h-4 w-4 animate-spin"
              />
            </Button>
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

    <!-- Confirmation Dialog -->
    <Dialog v-model:open="showConfirmDialog">
      <DialogScrollContent>
        <DialogHeader>
          <DialogTitle>Confirmação de Reprocessamento</DialogTitle>
          <DialogDescription>
            Você está prestes a reprocessar o arquivo "{{ fileToRetry?.fileName }}".
          </DialogDescription>
        </DialogHeader>
        
        <p class="my-4">
          O reprocessamento de arquivos pode gerar custos adicionais dependendo do seu plano.
          Deseja continuar com esta operação?
        </p>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            @click="showConfirmDialog = false"
          >
            Cancelar
          </Button>
          <Button 
            variant="default"
            :disabled="processingFile[fileToRetry?.id || '']"
            @click="handleRetry"
          >
            <Loader2
              v-if="processingFile[fileToRetry?.id || '']"
              class="h-4 w-4 mr-2 animate-spin"
            />
            Confirmar Reprocessamento
          </Button>
        </DialogFooter>
      </DialogScrollContent>
    </Dialog>
    
    <!-- Results Dialog -->
    <Dialog v-model:open="isDialogOpen">
      <DialogScrollContent class="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Resultado</DialogTitle>
          <DialogDescription v-if="selectedFile">
            {{ selectedFile.fileName }}
          </DialogDescription>
        </DialogHeader>
        
        <Card v-if="selectedFile && selectedFile.result">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="overflow-auto max-h-[400px]">
              <pre class="text-sm font-mono whitespace-pre-wrap break-words">{{ formattedJson }}</pre>
            </div>
          </CardContent>
        </Card>
        
        <Card v-else-if="selectedFile && selectedFile.error">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-destructive">
              {{ selectedFile.error }}
            </p>
          </CardContent>
        </Card>
        
        <DialogFooter>
          <Button @click="isDialogOpen = false">
            Fechar
          </Button>
        </DialogFooter>
      </DialogScrollContent>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
