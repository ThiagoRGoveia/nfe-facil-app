<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_WEBHOOKS } from '@/graphql/webhooks';
import type { 
  WebhookStatus, 
  WebhookEvent,
  PaginatedWebhookResponse,
} from '@/graphql/generated/graphql';
import type { WebhookItem, TableOptions } from './WebhookTypes';
import { webhookEvents } from './WebhookTypes';
import WebhookCreateForm from './WebhookCreateForm.vue';
import WebhookEditForm from './WebhookEditForm.vue';
import WebhookDeleteDialog from './WebhookDeleteDialog.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
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
  Plus,
  Pencil,
  Trash2,
} from 'lucide-vue-next';

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);

// Skeleton row count for loading state
const skeletonRowCount = 5;

// Sorting state
const sortColumn = ref('createdAt');
const sortDirection = ref<'asc' | 'desc'>('desc');

// Form dialogs state
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const selectedWebhook = ref<WebhookItem | null>(null);

// Computed tableOptions for API call compatibility
const tableOptions = computed<TableOptions>(() => ({
  page: currentPage.value,
  itemsPerPage: pageSize.value,
  sortBy: [{ key: sortColumn.value, order: sortDirection.value }],
}));

// Fetch webhooks
const { load, result, loading, refetch } = useLazyQuery<{ findAllWebhooks: PaginatedWebhookResponse }>(
  FIND_ALL_WEBHOOKS,
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
    keepPreviousResult: true,
    fetchPolicy: 'cache-first'
  }
);

// Computed webhooks list
const webhooksComputed = computed(() => {
  const webhooks = result.value?.findAllWebhooks.items ?? [];
  return webhooks.map(item => ({
    id: item.id,
    name: item.name,
    url: item.url,
    status: item.status,
    authType: item.authType,
    events: item.events,
    createdAt: item.createdAt,
    headers: item.headers ? (typeof item.headers === 'string' ? {} : item.headers) : {},
  }));
});

const totalItems = computed(() => result.value?.findAllWebhooks.total ?? 0);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

const columns = [
  {
    title: "Nome",
    key: "name",
    sortable: true,
  },
  {
    title: "URL",
    key: "url",
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
    sortable: true,
  },
  {
    title: "Eventos",
    key: "events",
    sortable: false,
  },
  {
    title: "Tipo de Autenticação",
    key: "authType",
    sortable: true,
  },
  {
    title: "Ações",
    key: "actions",
    sortable: false,
  },
];

const getBadgeVariant = (status: WebhookStatus) => {
  switch(status) {
    case 'ACTIVE': return 'secondary';
    case 'INACTIVE': return 'outline';
    default: return 'default';
  }
};

const getStatusLabel = (status: WebhookStatus) => {
  switch(status) {
    case 'ACTIVE': return 'Ativo';
    case 'INACTIVE': return 'Inativo';
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

// For pagination
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// Open edit dialog
const openEditDialog = (item: WebhookItem) => {
  selectedWebhook.value = item;
  showEditDialog.value = true;
};

// Open delete dialog
const openDeleteDialog = (webhook: WebhookItem) => {
  selectedWebhook.value = webhook;
  showDeleteDialog.value = true;
};

// Format events for display
const formatEvents = (events: WebhookEvent[]) => {
  if (!events || events.length === 0) return '';
  
  return events.map(event => {
    const eventOption = webhookEvents.find(opt => opt.value === event);
    return eventOption?.label || event;
  }).join(', ');
};

// Handle completed events from child components
const handleWebhookCreated = () => {
  refetch();
};

const handleWebhookUpdated = () => {
  refetch();
};

const handleWebhookDeleted = () => {
  refetch();
  selectedWebhook.value = null;
};

onMounted(() => {
  load();
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold tracking-tight">
        Webhooks
      </h2>
      <Button
        size="sm"
        class="rounded-full w-10 h-10 p-0"
        @click="showCreateDialog = true"
      >
        <Plus class="h-5 w-5" />
      </Button>
    </div>
    
    <div class="relative min-h-[400px]">
      <Table>
        <TableCaption v-if="webhooksComputed.length === 0 && !loading">
          Nenhum webhook configurado
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
          <template v-if="loading && webhooksComputed.length === 0">
            <TableRow
              v-for="i in skeletonRowCount"
              :key="`skeleton-${i}`"
              class="hover:bg-muted/50"
            >
              <TableCell>
                <Skeleton class="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-[250px]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-[80px]" />
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Skeleton class="h-10 w-10 rounded-full" />
                  <Skeleton class="h-10 w-10 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          </template>
          
          <!-- Actual data -->
          <TableRow 
            v-for="webhook in webhooksComputed"
            v-else-if="!loading" 
            :key="webhook.id" 
            class="hover:bg-muted/50"
          >
            <TableCell>{{ webhook.name }}</TableCell>
            <TableCell class="max-w-md truncate">
              {{ webhook.url }}
            </TableCell>
            <TableCell>
              <Badge :variant="getBadgeVariant(webhook.status)">
                {{ getStatusLabel(webhook.status) }}
              </Badge>
            </TableCell>
            <TableCell>
              <span class="text-sm text-muted-foreground">
                {{ formatEvents(webhook.events) }}
              </span>
            </TableCell>
            <TableCell>{{ webhook.authType }}</TableCell>
            <TableCell>
              <div class="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  class="rounded-full h-10 w-10"
                  @click.stop="openEditDialog(webhook)"
                >
                  <Pencil class="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  class="rounded-full h-10 w-10"
                  @click.stop="openDeleteDialog(webhook)"
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div class="flex items-center justify-between space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
          Mostrando {{ webhooksComputed.length > 0 ? (currentPage - 1) * pageSize + 1 : 0 }} até 
          {{ Math.min(currentPage * pageSize, totalItems) }} de {{ totalItems }} webhooks
        </div>
        
        <!-- Pagination component -->
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

    <!-- Create Webhook Form -->
    <WebhookCreateForm 
      v-model:show="showCreateDialog"
      @created="handleWebhookCreated"
    />

    <!-- Edit Webhook Form -->
    <WebhookEditForm
      v-model:show="showEditDialog"
      :webhook="selectedWebhook"
      @updated="handleWebhookUpdated"
    />

    <!-- Delete Webhook Dialog -->
    <WebhookDeleteDialog
      v-model:show="showDeleteDialog"
      :webhook="selectedWebhook"
      @deleted="handleWebhookDeleted"
    />
  </div>
</template>

<style scoped>
</style> 