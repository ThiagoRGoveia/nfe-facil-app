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
import { WebhookEvent } from '@/graphql/generated/graphql';

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
    authType: z.enum(authTypes.map(type => type.value) as [string, ...string[]]),
    events: z.array(z.enum(webhookEvents.map(event => event.value) as [string, ...string[]])).min(1, 'Selecione pelo menos um evento'),
    active: z.boolean(),
    headers: z.record(z.string()).optional(),
    authConfig: z.any().optional()
  })
);

// Toast notification
const { toast } = useToast();

// Form submission state
const isSubmitting = ref(false);

// Edit form
const form = useForm<EditWebhookFormValues>({
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
watch(() => form.values.authType, (newAuthType) => {
  if (newAuthType === 'BASIC') {
    form.setFieldValue('authConfig', { username: '', password: '' });
  } else if (newAuthType === 'OAUTH2') {
    form.setFieldValue('authConfig', { clientId: '', clientSecret: '', tokenUrl: '' });
  } else {
    form.setFieldValue('authConfig', undefined);
  }
});

// Edit form submission
const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    if (!props.webhook) return;
    
    const id = props.webhook.id;
    const input = {
      name: values.name,
      url: values.url,
      authType: values.authType,
      events: values.events,
      headers: values.headers || {},
      authConfig: values.authConfig,
      active: values.active
    };

    await updateWebhook({ id, input })
      .then(() => {
        toast({
          title: "Webhook atualizado",
          description: "O webhook foi atualizado com sucesso.",
        });
        emit('updated');
        emit('update:show', false);
        form.resetForm();
      })
      .catch((error: ApolloError) => {
        toast({
          title: "Erro ao atualizar webhook",
          description: error.message,
          variant: "destructive",
        });
      });
  } catch (error) {
    toast({
      title: "Erro ao atualizar webhook",
      description: (error as Error).message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
});

// Computed property for dialog visibility
const dialogOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

const toggleEvent = (event: WebhookEvent, checked: boolean | 'indeterminate') => {
  if (checked === 'indeterminate') {
    return;
  }
  const currentEvents = form.values.events ?? [];
  if (checked) {
    form.setFieldValue('events', [...currentEvents, event]);
  } else {
    form.setFieldValue('events', currentEvents.filter(e => e !== event));
  }
};

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
    
    form.resetForm({
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
      
      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField 
            v-slot="{ field }"
            name="name"
          >
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  placeholder="Nome do webhook"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          
          <FormField 
            v-slot="{ field }"
            name="url"
          >
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  placeholder="https://seu-endpoint.com/webhook"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          
          <FormField 
            v-slot
            name="authType"
          >
            <FormItem>
              <FormLabel>Tipo de Autenticação</FormLabel>
              <FormControl>
                <Select 
                  :model-value="form.values.authType"
                  @update:model-value="(value) => form.setFieldValue('authType', value as 'NONE' | 'BASIC' | 'OAUTH2')"
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
              <FormMessage />
            </FormItem>
          </FormField>
          
          <!-- Basic Auth Config - Edit Form -->
          <div
            v-if="form.values.authType === 'BASIC'"
            class="space-y-4 border p-4 rounded-md"
          >
            <h4 class="font-medium">
              Configuração de Autenticação Básica
            </h4>
            
            <FormField 
              v-slot
              name="authConfig.username"
            >
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input 
                    :value="(form.values.authConfig as BasicAuthConfig)?.username || ''" 
                    placeholder="Seu usuário"
                    @input="(e: Event) => form.setFieldValue('authConfig.username', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            
            <FormField 
              v-slot
              name="authConfig.password"
            >
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                    :value="(form.values.authConfig as BasicAuthConfig)?.password || ''" 
                    type="password"
                    placeholder="Sua senha" 
                    @input="(e: Event) => form.setFieldValue('authConfig.password', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          
          <!-- OAuth2 Config - Edit Form -->
          <div
            v-if="form.values.authType === 'OAUTH2'"
            class="space-y-4 border p-4 rounded-md"
          >
            <h4 class="font-medium">
              Configuração de Autenticação OAuth2
            </h4>
            
            <FormField 
              v-slot
              name="authConfig.clientId"
            >
              <FormItem>
                <FormLabel>Client ID</FormLabel>
                <FormControl>
                  <Input 
                    :value="(form.values.authConfig as OAuth2Config)?.clientId || ''" 
                    placeholder="Client ID"
                    @input="(e: Event) => form.setFieldValue('authConfig.clientId', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            
            <FormField 
              v-slot
              name="authConfig.clientSecret"
            >
              <FormItem>
                <FormLabel>Client Secret</FormLabel>
                <FormControl>
                  <Input 
                    :value="(form.values.authConfig as OAuth2Config)?.clientSecret || ''" 
                    type="password"
                    placeholder="Client Secret" 
                    @input="(e: Event) => form.setFieldValue('authConfig.clientSecret', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            
            <FormField 
              v-slot
              name="authConfig.tokenUrl"
            >
              <FormItem>
                <FormLabel>URL do Token</FormLabel>
                <FormControl>
                  <Input 
                    :value="(form.values.authConfig as OAuth2Config)?.tokenUrl || ''" 
                    placeholder="https://auth.exemplo.com/token"
                    @input="(e: Event) => form.setFieldValue('authConfig.tokenUrl', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          
          <FormField 
            v-slot
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
                    :model-value="form.values.events?.includes(event.value as any)"
                    @update:model-value="(checked: boolean | 'indeterminate') => toggleEvent(event.value, checked)"
                  />
                  <label 
                    :for="`edit-event-${event.value}`"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {{ event.label }}
                  </label>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
          
          <FormField 
            v-slot
            name="active"
          >
            <FormItem class="flex flex-row items-start space-x-3 space-y-0 p-2 border rounded-md">
              <FormControl>
                <Checkbox 
                  :id="'edit-active-status'"
                  :model-value="form.values.active"
                  @update:model-value="(checked) => {
                    if (checked !== 'indeterminate') {
                      form.setFieldValue('active', checked);
                    }
                  }"
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
              <FormMessage />
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
      </form>
    </DialogContent>
  </Dialog>
</template> 