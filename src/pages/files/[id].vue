<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { FIND_BATCH_PROCESS_BY_ID, PROCESS_OUTPUT_CONSOLIDATION } from "@/graphql/history";
import ConversionResult from "@/components/business/file-conversion/ConversionResult.vue";
import FilesTable from "@/components/business/file-conversion/FilesTable.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { Loader2, RefreshCw, FilePlus } from "lucide-vue-next";
import { BatchProcess } from "@/graphql/generated/graphql";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// Define badge variant types based on the available options in the UI kit
type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "info" | "success" | "violet" | "purple" | "yellow" | "green" | null | undefined;

const route = useRoute();
const router = useRouter();
const batchId = computed(() => (route.params as { id: string }).id);
const { toast } = useToast();
const isRefreshing = computed(() => queryLoading.value && batchProcess.value !== null);

// A counter to trigger refreshes in child components
const refreshTrigger = ref(0);

// Track the source of navigation (history or direct from dashboard)
const fromHistory = computed(() => {
  // This could be enhanced with actual path tracking if needed
  return route.query.from === 'history';
});

// Execute the query to fetch batch process details
const { result, load, loading: queryLoading, error: queryError, refetch } = useLazyQuery(
  FIND_BATCH_PROCESS_BY_ID,
  () => ({
    id: batchId.value
  }),
  {
    keepPreviousResult: true,
    prefetch: false,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  }
);

// Derive batch data from query result using computed property instead of deprecated useResult
const batchProcess = computed<BatchProcess | null>(() => 
  result.value?.findBatchProcessById || null
);

// Interface for download links
interface DownloadLinks {
  json?: string | null;
  csv?: string | null;
  excel?: string | null;
  [key: string]: string | null | undefined;
}

// Prepare download links for ConversionResult component
const downloadLinks = computed<DownloadLinks>(() => {
  if (!batchProcess.value) return {};
  
  return {
    json: batchProcess.value.jsonResults,
    csv: batchProcess.value.csvResults,
    excel: batchProcess.value.excelResults
  };
});

// Check if the batch has any download links available
const hasDownloadLinks = computed(() => {
  return Object.values(downloadLinks.value).some(link => !!link);
});

// Track errors for display
const fileErrors = computed(() => {
  return [];  // This would be filled with any file errors from the batch
});

// Watch for query error
onMounted(() => {
  load();
});

const isProcessing = computed(() => {
  return batchProcess.value && (
    batchProcess.value.status === 'PROCESSING' || 
    batchProcess.value.status === 'CREATED'
  );
});

const handleError = (message: string) => {
  toast({
    variant: "destructive",
    title: "Erro",
    description: message
  });
};

const refreshData = () => {
  refetch();
  // Increment the refresh trigger to notify child components
  refreshTrigger.value++;
  
  toast({
    title: "Atualizando",
    description: "Buscando informações mais recentes.",
    duration: 2000
  });
};

const getStatusLabel = (status: string) => {
  switch(status) {
    case 'COMPLETED': return "Concluído";
    case 'FAILED': return "Falhou";
    case 'PENDING': return "Pendente";
    case 'CREATED': return "Criado";
    default: return status;
  }
};

const getStatusVariant = (status: string): BadgeVariant => {
  switch(status) {
    case 'COMPLETED': return "success";
    case 'FAILED': return "destructive";
    case 'PENDING': return "secondary";
    case 'CREATED': return "outline";
    case 'PROCESSING': return "default";
    default: return "default";
  }
};

const getFormatBadgeVariant = (index: number): BadgeVariant => {
  const variants: BadgeVariant[] = ["default", "secondary", "outline"];
  return variants[index % variants.length];
};

// Consolidation state
const isConsolidating = ref(false);
const showConfirmDialog = ref(false);

// Process output consolidation mutation
const { mutate: consolidateOutputs } = useMutation(
  PROCESS_OUTPUT_CONSOLIDATION,
  {
    variables: {
      batchId: batchId.value
    },
    update: (cache, { data }) => {
      if (data?.processOutputConsolidation) {
        // Refetch the batch details to update UI
        refetch();
      }
    },
  }
);

const handleConsolidation = async () => {
  // If download links exist, we should confirm first
  if (hasDownloadLinks.value) {
    showConfirmDialog.value = true;
    return;
  }
  
  // Otherwise proceed directly
  await processConsolidation();
};

const processConsolidation = async () => {
  try {
    isConsolidating.value = true;
    await consolidateOutputs();
    
    toast({
      title: "Sucesso",
      description: "Solicitação de consolidação processada com sucesso.",
      duration: 3000
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao consolidar resultados.';
    toast({
      variant: "destructive",
      title: "Erro",
      description: errorMessage
    });
  } finally {
    isConsolidating.value = false;
    showConfirmDialog.value = false;
  }
};
</script>

<template>
  <div class="container py-8">
    <!-- Breadcrumbs -->
    <Breadcrumb class="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink @click="router.push('/dashboard')">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem v-if="fromHistory">
          <BreadcrumbLink @click="router.push('/history')">
            Histórico
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Detalhes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">
        Detalhes da Conversão
      </h1>
      <div class="flex gap-2">
        <Button 
          variant="outline"
          :disabled="isConsolidating || isRefreshing || !batchProcess || batchProcess.status !== 'COMPLETED'"
          title="Consolidar resultados"
          @click="handleConsolidation"
        >
          <FilePlus class="h-4 w-4 mr-2" />
          Consolidar
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          :disabled="isRefreshing"
          title="Atualizar dados"
          @click="refreshData"
        >
          <RefreshCw :class="['h-5 w-5', isRefreshing ? 'animate-spin' : '']" />
        </Button>
      </div>
    </div>
    
    <!-- Loading state -->
    <div
      v-if="queryLoading && !batchProcess"
      class="py-12 flex flex-col items-center"
    >
      <Loader2 class="h-12 w-12 animate-spin text-primary mb-4" />
      <p class="text-muted-foreground">
        Carregando detalhes da conversão...
      </p>
    </div>
    
    <!-- Error state -->
    <div
      v-else-if="queryError"
      class="py-12 text-center"
    >
      <p class="text-destructive font-medium text-lg mb-2">
        Não foi possível carregar os detalhes da conversão
      </p>
      <p class="text-muted-foreground">
        {{ queryError.message }}
      </p>
    </div>
    
    <!-- Content when loaded -->
    <div
      v-else-if="batchProcess"
      class="space-y-8"
    >
      <!-- Batch details card -->
      <div class="p-6 bg-card rounded-lg border shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 class="text-xl font-semibold mb-4">
              Informações da Conversão
            </h2>
            <dl class="space-y-2">
              <div class="flex justify-between items-center">
                <dt class="text-muted-foreground">
                  Status:
                </dt>
                <dd>
                  <Badge :variant="getStatusVariant(batchProcess.status)">
                    {{ getStatusLabel(batchProcess.status) }}
                  </Badge>
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">
                  Arquivos processados:
                </dt>
                <dd>{{ batchProcess.processedFiles }} / {{ batchProcess.totalFiles }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">
                  Data de criação:
                </dt>
                <dd>{{ new Date(batchProcess.createdAt).toLocaleString() }}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold mb-4">
              Formatos solicitados
            </h2>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="(format, index) in batchProcess.requestedFormats"
                :key="format"
                :variant="getFormatBadgeVariant(index)"
              >
                {{ format.toUpperCase() }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Show conversion result with downloads if processing is complete -->
      <div v-if="hasDownloadLinks">
        <ConversionResult 
          :download-links="downloadLinks"
          :errors="fileErrors"
          hide-reset-button
          @error="handleError"
        />
      </div>
      
      <!-- Processing indicator if still processing -->
      <div
        v-if="isProcessing"
        class="py-4 text-center"
      >
        <Loader2 class="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
        <p class="text-muted-foreground">
          Processamento em andamento... {{ batchProcess.processedFiles }} de {{ batchProcess.totalFiles }} arquivos processados.
        </p>
      </div>
      
      <!-- Files table -->
      <div>
        <h2 class="text-xl font-semibold mb-4">
          Arquivos
        </h2>
        <FilesTable 
          :batch-id="batchId" 
          :refresh-trigger="refreshTrigger"
        />
      </div>
    </div>
    
    <!-- Confirmation Dialog -->
    <Dialog v-model:open="showConfirmDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Reconsolidação</DialogTitle>
          <DialogDescription>
            Você está prestes a reconsolidar os resultados deste lote.
          </DialogDescription>
        </DialogHeader>
      
        <p class="my-4">
          Os resultados atuais serão substituídos por novos. Esta operação pode gerar custos adicionais dependendo do seu plano.
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
            :disabled="isConsolidating"
            @click="processConsolidation"
          >
            <Loader2
              v-if="isConsolidating"
              class="h-4 w-4 mr-2 animate-spin"
            />
            Confirmar Reconsolidação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template> 