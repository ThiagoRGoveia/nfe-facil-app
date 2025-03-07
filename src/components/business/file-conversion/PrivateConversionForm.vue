<script setup lang="ts">
import { ref, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { PROCESS_BATCH_SYNC } from "@/graphql/private";
import ConversionForm from "./ConversionForm.vue";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { FileFormat } from "@/graphql/generated/graphql";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";

const router = useRouter();
const loading = ref(false);
const processing = ref(false);
const error = ref("");
const batchId = ref<string | null>(null);
const { toast } = useToast();

// Watch for error changes and show a toast when there's an error
watch(error, (newError) => {
  if (newError) {
    toast({
      variant: "destructive",
      title: "Erro",
      description: newError
    });
  }
});

const { mutate: processFiles } = useMutation(PROCESS_BATCH_SYNC);

const handleSubmit = async (data: { files: File[]; formats: FileFormat[] }) => {
  try {
    processing.value = true;
    loading.value = true;
    error.value = "";
    batchId.value = null;

    const result = await processFiles({
      variables: {
        input: {
          files: data.files,
          outputFormats: data.formats,
        }
      }
    });

    if (result?.data?.processBatchSync) {
      // Store the batch ID for tracking
      batchId.value = result.data.processBatchSync.id;
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Tivemos um problema, tente novamente mais tarde";
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  processing.value = false;
  batchId.value = null;
  error.value = "";
};

const handleTrackResults = () => {
  if (batchId.value) {
    router.push({
      path: `/files/${batchId.value}`,
    });
  }
};
</script>

<template>
  <div class="h-full relative">
    <!-- Show ConversionForm if not processing -->
    <ConversionForm
      v-if="!processing"
      title="Extrair dados de Notas Fiscais em PDF"
      @submit="handleSubmit"
    />
    
    <!-- Show processing message after submission -->
    <div 
      v-else
      class="flex flex-col items-center justify-center h-full p-6 text-center"
    >
      <div class="mb-4">
        <Loader2 class="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Extração em andamento</h3>
        <p class="text-muted-foreground mb-6">
          Seus arquivos estão sendo processados. Você pode acompanhar o status ou enviar novos arquivos.
        </p>
      </div>
      
      <div class="flex gap-4">
        <Button 
          variant="default" 
          @click="handleTrackResults"
        >
          Acompanhar resultados
        </Button>
        
        <Button 
          variant="outline" 
          @click="handleReset"
        >
          Enviar novos arquivos
        </Button>
      </div>
    </div>

    <!-- Loading overlay only for initial submission -->
    <div 
      v-if="loading" 
      class="absolute inset-0 bg-background/80 flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-2">
        <Loader2 class="h-8 w-8 animate-spin text-primary" />
        <span class="text-sm">Processando arquivos...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-full {
  height: 100%;
}
</style> 