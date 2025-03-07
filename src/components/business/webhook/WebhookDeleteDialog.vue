<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { DELETE_WEBHOOK } from '@/graphql/webhooks';
import type { WebhookItem } from './WebhookTypes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-vue-next';
import { useToast } from "@/components/ui/toast/use-toast";
import { ApolloError } from '@apollo/client/core';

const props = defineProps<{
  show: boolean;
  webhook: WebhookItem | null;
}>();

const emit = defineEmits<{
  'update:show': [value: boolean];
  'deleted': [];
}>();

// Toast notification
const { toast } = useToast();

// Form submission state
const isSubmitting = ref(false);

// Delete webhook mutation
const { mutate: deleteWebhook } = useMutation(DELETE_WEBHOOK);

// Handle delete webhook
const handleDeleteWebhook = async () => {
  if (!props.webhook) return;
  
  isSubmitting.value = true;
  try {
    await deleteWebhook({ id: props.webhook.id })
      .then(() => {
        toast({
          title: "Webhook removido",
          description: "O webhook foi removido com sucesso.",
        });
        emit('deleted');
        emit('update:show', false);
      })
      .catch((error: ApolloError) => {
        toast({
          title: "Erro ao deletar webhook",
          description: error.message,
          variant: "destructive",
        });
      });
  } catch (error) {
    toast({
      title: "Erro ao deletar webhook",
      description: (error as Error).message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Computed property for dialog visibility
const dialogOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogDescription>
          Você tem certeza que deseja excluir o webhook "{{ webhook?.name }}"?
          Esta ação não pode ser desfeita.
        </DialogDescription>
      </DialogHeader>
      
      <DialogFooter>
        <Button 
          variant="outline" 
          :disabled="isSubmitting"
          @click="dialogOpen = false"
        >
          Cancelar
        </Button>
        <Button 
          variant="destructive"
          :disabled="isSubmitting"
          @click="handleDeleteWebhook"
        >
          <RefreshCw
            v-if="isSubmitting"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template> 