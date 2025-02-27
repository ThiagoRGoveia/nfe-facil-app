<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { UPDATE_WEBHOOK } from '@/graphql/webhooks';
import type { 
  WebhookFormValues, 
  BasicAuthConfig, 
  OAuth2Config, 
  WebhookItem, 
  EditWebhookFormValues
} from './WebhookTypes';
import { webhookEvents, authTypes, isBasicAuthConfig, isOAuth2Config } from './WebhookTypes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from 'lucide-vue-next';
import { useToast } from "@/components/ui/toast/use-toast";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ApolloError } from '@apollo/client/core';

const props = defineProps<{
  show: boolean;
  webhook: WebhookItem | null;
}>();

const emit = defineEmits<{
  'update:show': [value: boolean];
  'updated': [];
}>();

// Form validation schema
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    url: z.string().url('URL inválida').min(1, 'URL é obrigatória'),
    authType: z.enum(['NONE', 'BASIC', 'OAUTH2'] as const),
    events: z.array(z.enum(['COMPANY_CREATED', 'INVOICE_CREATED', 'INVOICE_CANCELLED', 'INVOICE_ERROR'] as const)).min(1, 'Selecione pelo menos um evento'),
    active: z.boolean(),
    headers: z.any().optional(),
    authConfig: z.any().optional()
  })
);

// Toast notification
const { toast } = useToast();

// Form submission state
const isSubmitting = ref(false);

// Edit form
const editForm = useForm<EditWebhookFormValues>({
  validationSchema: formSchema,
  initialValues: {
    name: props.webhook?.name || '',
    url: props.webhook?.url || '',
    authType: props.webhook?.authType || 'NONE',
    events: props.webhook?.events || [],
    authConfig: props.webhook?.authConfig || undefined,
    headers: props.webhook?.headers || {},
    active: props.webhook?.status === 'ACTIVE'
  }
});

// Update webhook mutation
const { mutate: updateWebhook } = useMutation(UPDATE_WEBHOOK);

// Handle auth type change in edit form
watch(() => editForm.values.authType, (newAuthType) => {
  if (newAuthType === 'BASIC') {
    editForm.setFieldValue('authConfig', { username: '', password: '' });
  } else if (newAuthType === 'OAUTH2') {
    editForm.setFieldValue('authConfig', { clientId: '', clientSecret: '', tokenUrl: '' });
  } else {
    editForm.setFieldValue('authConfig', undefined);
  }
});

// Handle update webhook success and error
const handleUpdateWebhookError = (error: ApolloError) => {
  toast({
    title: "Erro ao atualizar webhook",
    description: error.message,
    variant: "destructive",
  });
  isSubmitting.value = false;
};

const handleUpdateWebhookCompleted = () => {
  toast({
    title: "Webhook atualizado",
    description: "O webhook foi atualizado com sucesso.",
  });
  emit('update:show', false);
  isSubmitting.value = false;
  emit('updated');
};

// Edit form submission
const handleEditSubmit = async (values: EditWebhookFormValues) => {
  isSubmitting.value = true;
  try {
    if (!props.webhook) return;
    
    const input = {
      id: props.webhook.id,
      name: values.name,
      url: values.url,
      authType: values.authType,
      events: values.events,
      headers: values.headers || {},
      authConfig: values.authConfig,
      active: values.active
    };

    await updateWebhook({
      variables: { input },
      onCompleted: handleUpdateWebhookCompleted,
      onError: handleUpdateWebhookError
    });
  } catch (error) {
    handleUpdateWebhookError(error as ApolloError);
  }
};

// Computed property for dialog visibility
const dialogOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

// Initialize form values when webhook changes
watch(() => props.webhook, (newWebhook) => {
  if (newWebhook) {
    let initialAuthConfig = undefined;
    
    if (newWebhook.authType === 'BASIC' && isBasicAuthConfig(newWebhook.authConfig)) {
      initialAuthConfig = {
        username: newWebhook.authConfig.username,
        password: newWebhook.authConfig.password
      };
    } else if (newWebhook.authType === 'OAUTH2' && isOAuth2Config(newWebhook.authConfig)) {
      initialAuthConfig = {
        clientId: newWebhook.authConfig.clientId,
        clientSecret: newWebhook.authConfig.clientSecret,
        tokenUrl: newWebhook.authConfig.tokenUrl
      };
    }
    
    editForm.resetForm({
      values: {
        name: newWebhook.name,
        url: newWebhook.url,
        authType: newWebhook.authType,
        events: newWebhook.events,
        authConfig: initialAuthConfig,
        headers: newWebhook.headers || {},
        active: newWebhook.status === 'ACTIVE'
      }
    });
  }
}, { immediate: true });
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Editar Webhook</DialogTitle>
        <DialogDescription>
          Atualize as configurações do webhook.
        </DialogDescription>
      </DialogHeader>
      
      <Form
        v-slot="{ errors }"
        :validation-schema="formSchema"
        as="form"
        @submit="editForm.handleSubmit(handleEditSubmit)"
      >
        <div class="grid gap-4 py-4">
          <FormField 
            name="name"
            :validate-on-input="true"
          >
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  v-model="editForm.values.name"
                  placeholder="Nome do webhook"
                />
              </FormControl>
              <FormMessage v-if="errors.name">
                {{ errors.name }}
              </FormMessage>
            </FormItem>
          </FormField>
          
          <FormField 
            name="url"
            :validate-on-input="true"
          >
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  v-model="editForm.values.url"
                  placeholder="https://seu-endpoint.com/webhook"
                />
              </FormControl>
              <FormMessage v-if="errors.url">
                {{ errors.url }}
              </FormMessage>
            </FormItem>
          </FormField>
          
          <FormField 
            name="authType"
          >
            <FormItem>
              <FormLabel>Tipo de Autenticação</FormLabel>
              <FormControl>
                <Select 
                  v-model="editForm.values.authType"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de autenticação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="type in authTypes" 
                      :key="type.value" 
                      :value="type.value"
                    >
                      {{ type.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage v-if="errors.authType">
                {{ errors.authType }}
              </FormMessage>
            </FormItem>
          </FormField>
          
          <!-- Basic Auth Config - Edit Form -->
          <div
            v-if="editForm.values.authType === 'BASIC'"
            class="space-y-4 border p-4 rounded-md"
          >
            <h4 class="font-medium">
              Configuração de Autenticação Básica
            </h4>
            
            <FormField 
              name="authConfig.username"
            >
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input 
                    :value="(editForm.values.authConfig as BasicAuthConfig)?.username || ''" 
                    placeholder="Seu usuário"
                    @input="(e: Event) => editForm.setFieldValue('authConfig.username', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
            
            <FormField 
              name="authConfig.password"
            >
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                    :value="(editForm.values.authConfig as BasicAuthConfig)?.password || ''" 
                    type="password"
                    placeholder="Sua senha" 
                    @input="(e: Event) => editForm.setFieldValue('authConfig.password', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
          </div>
          
          <!-- OAuth2 Config - Edit Form -->
          <div
            v-if="editForm.values.authType === 'OAUTH2'"
            class="space-y-4 border p-4 rounded-md"
          >
            <h4 class="font-medium">
              Configuração de Autenticação OAuth2
            </h4>
            
            <FormField 
              name="authConfig.clientId"
            >
              <FormItem>
                <FormLabel>Client ID</FormLabel>
                <FormControl>
                  <Input 
                    :value="(editForm.values.authConfig as OAuth2Config)?.clientId || ''" 
                    placeholder="Client ID"
                    @input="(e: Event) => editForm.setFieldValue('authConfig.clientId', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
            
            <FormField 
              name="authConfig.clientSecret"
            >
              <FormItem>
                <FormLabel>Client Secret</FormLabel>
                <FormControl>
                  <Input 
                    :value="(editForm.values.authConfig as OAuth2Config)?.clientSecret || ''" 
                    type="password"
                    placeholder="Client Secret" 
                    @input="(e: Event) => editForm.setFieldValue('authConfig.clientSecret', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
            
            <FormField 
              name="authConfig.tokenUrl"
            >
              <FormItem>
                <FormLabel>URL do Token</FormLabel>
                <FormControl>
                  <Input 
                    :value="(editForm.values.authConfig as OAuth2Config)?.tokenUrl || ''" 
                    placeholder="https://auth.exemplo.com/token"
                    @input="(e: Event) => editForm.setFieldValue('authConfig.tokenUrl', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
          </div>
          
          <FormField 
            name="events"
          >
            <FormItem>
              <FormLabel>Eventos</FormLabel>
              <div class="space-y-2">
                <div
                  v-for="event in webhookEvents"
                  :key="event.value"
                  class="flex gap-2 items-center"
                >
                  <Checkbox 
                    :id="`edit-event-${event.value}`"
                    :value="event.value"
                    :checked="editForm.values.events?.includes(event.value)"
                    @update:checked="
                      editForm.values.events = editForm.values.events?.includes(event.value)
                        ? editForm.values.events?.filter(e => e !== event.value)
                        : [...(editForm.values.events || []), event.value]
                    "
                  />
                  <label 
                    :for="`edit-event-${event.value}`"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {{ event.label }}
                  </label>
                </div>
              </div>
              <FormMessage v-if="errors.events">
                {{ errors.events }}
              </FormMessage>
            </FormItem>
          </FormField>
          
          <FormField 
            name="active"
          >
            <FormItem class="flex flex-row items-start space-x-3 space-y-0 p-2 border rounded-md">
              <FormControl>
                <Checkbox 
                  :id="'edit-active-status'"
                  v-model="editForm.values.active"
                />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel :for="'edit-active-status'">
                  Ativo
                </FormLabel>
                <p class="text-sm text-muted-foreground">
                  Determina se o webhook está ativo e receberá notificações.
                </p>
              </div>
              <FormMessage v-if="errors.active">
                {{ errors.active }}
              </FormMessage>
            </FormItem>
          </FormField>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            :disabled="isSubmitting"
            @click="dialogOpen = false"
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            :disabled="isSubmitting"
          >
            <RefreshCw
              v-if="isSubmitting"
              class="mr-2 h-4 w-4 animate-spin"
            />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template> 