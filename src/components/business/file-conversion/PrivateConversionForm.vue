<script setup lang="ts">
import { ref, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { CREATE_BATCH } from "@/graphql/private";
import ConversionForm from "./ConversionForm.vue";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { FileFormat } from "@/graphql/generated/graphql";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { ApolloError } from "@apollo/client/core";

const router = useRouter();
const loading = ref(false);
const processing = ref(false);
const batchId = ref<string | null>(null);
const { toast } = useToast();
const { mutate: processFiles, error } = useMutation(CREATE_BATCH);

// Watch for error changes and show a toast when there's an error
watch(error, (newError) => {
  if (newError) {
    toast({
      variant: "destructive",
      title: "Erro",
    });
  }
});


const handleSubmit = async (data: { files: File[]; formats: FileFormat[] }) => {
  try {
    processing.value = true;
    loading.value = true;
    batchId.value = null;

    const result = await processFiles({
      input: {
        files: data.files,
        outputFormats: data.formats,
        templateId: import.meta.env.VITE_NFE_TEMPLATE,
      }
    });
    if (result?.data?.createBatchProcess) {
      // Store the batch ID for tracking
      batchId.value = result.data.createBatchProcess.id;
    }
  } catch (e) {
    processing.value = false;
    
    if (e instanceof ApolloError) {
    toast({
        title: "Erro no processamento",
        description: e.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erro no processamento",
        description: e instanceof Error ? e.message : "Tivemos um problema, tente novamente mais tarde",
        variant: "destructive",
      });
    }
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  processing.value = false;
  batchId.value = null;
};

const handleTrackResults = () => {
  if (batchId.value) {
    router.push({
      path: `/files/${batchId.value}`,
    });
  } else {
    toast({
      title: "Erro ao acompanhar resultados",
      description: "Não foi possível encontrar o ID do lote de processamento.",
      variant: "destructive",
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
        <h3 class="text-xl font-semibold mb-2">
          Extração em andamento
        </h3>
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
  </div>
</template>

<style scoped>
.h-full {
  height: 100%;
}
</style> 