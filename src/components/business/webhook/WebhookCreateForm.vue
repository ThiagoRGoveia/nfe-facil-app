<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_WEBHOOK } from '@/graphql/webhooks';
import type { 
  WebhookFormValues, 
  BasicAuthConfig, 
  OAuth2Config 
} from './WebhookTypes';
import { webhookEvents, authTypes } from './WebhookTypes';
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
}>();

const emit = defineEmits<{
  'update:show': [value: boolean];
  'created': [];
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

// Create form
const createForm = useForm<WebhookFormValues>({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    url: '',
    authType: 'NONE',
    events: [],
    authConfig: undefined,
    headers: {}
  }
});

// Create webhook mutation
const { mutate: createWebhook } = useMutation(CREATE_WEBHOOK);

// Handle auth type change in create form
watch(() => createForm.values.authType, (newAuthType) => {
  if (newAuthType === 'BASIC') {
    createForm.setFieldValue('authConfig', { username: '', password: '' });
  } else if (newAuthType === 'OAUTH2') {
    createForm.setFieldValue('authConfig', { clientId: '', clientSecret: '', tokenUrl: '' });
  } else {
    createForm.setFieldValue('authConfig', undefined);
  }
});

// Handle create webhook success and error
const handleCreateWebhookError = (error: ApolloError) => {
  toast({
    title: "Erro ao criar webhook",
    description: error.message,
    variant: "destructive",
  });
  isSubmitting.value = false;
};

const handleCreateWebhookCompleted = () => {
  toast({
    title: "Webhook criado",
    description: "O webhook foi criado com sucesso.",
  });
  emit('update:show', false);
  isSubmitting.value = false;
  emit('created');
  createForm.resetForm();
};

// Create form submission
const handleCreateSubmit = async (values: WebhookFormValues) => {
  isSubmitting.value = true;
  try {
    const input = {
      name: values.name,
      url: values.url,
      authType: values.authType,
      events: values.events,
      headers: values.headers || {},
      authConfig: values.authConfig
    };

    await createWebhook({
      variables: { input },
      onCompleted: handleCreateWebhookCompleted,
      onError: handleCreateWebhookError
    });
  } catch (error) {
    handleCreateWebhookError(error as ApolloError);
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
    <DialogContent class="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Criar Webhook</DialogTitle>
        <DialogDescription>
          Adicione um novo endpoint de webhook para receber notificações.
        </DialogDescription>
      </DialogHeader>
      
      <Form
        v-slot="{ errors }"
        :validation-schema="formSchema"
        as="form"
        @submit="createForm.handleSubmit(handleCreateSubmit)"
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
                  v-model="createForm.values.name"
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
                  v-model="createForm.values.url"
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
                  v-model="createForm.values.authType"
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
          
          <!-- Basic Auth Config - Create Form -->
          <div
            v-if="createForm.values.authType === 'BASIC'"
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
                    :value="(createForm.values.authConfig as BasicAuthConfig)?.username || ''" 
                    placeholder="Seu usuário"
                    @input="(e: Event) => createForm.setFieldValue('authConfig.username', (e.target as HTMLInputElement).value)" 
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
                    :value="(createForm.values.authConfig as BasicAuthConfig)?.password || ''" 
                    type="password"
                    placeholder="Sua senha" 
                    @input="(e: Event) => createForm.setFieldValue('authConfig.password', (e.target as HTMLInputElement).value)" 
                  />
                </FormControl>
                <FormMessage v-if="errors.authConfig">
                  {{ errors.authConfig }}
                </FormMessage>
              </FormItem>
            </FormField>
          </div>
          
          <!-- OAuth2 Config - Create Form -->
          <div
            v-if="createForm.values.authType === 'OAUTH2'"
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
                    :value="(createForm.values.authConfig as OAuth2Config)?.clientId || ''" 
                    placeholder="Client ID"
                    @input="(e: Event) => createForm.setFieldValue('authConfig.clientId', (e.target as HTMLInputElement).value)" 
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
                    :value="(createForm.values.authConfig as OAuth2Config)?.clientSecret || ''" 
                    type="password"
                    placeholder="Client Secret" 
                    @input="(e: Event) => createForm.setFieldValue('authConfig.clientSecret', (e.target as HTMLInputElement).value)" 
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
                    :value="(createForm.values.authConfig as OAuth2Config)?.tokenUrl || ''" 
                    placeholder="https://auth.exemplo.com/token"
                    @input="(e: Event) => createForm.setFieldValue('authConfig.tokenUrl', (e.target as HTMLInputElement).value)" 
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
                    :id="`create-event-${event.value}`"
                    :value="event.value"
                    :checked="createForm.values.events?.includes(event.value)"
                    @update:checked="
                      createForm.values.events = createForm.values.events?.includes(event.value)
                        ? createForm.values.events?.filter(e => e !== event.value)
                        : [...(createForm.values.events || []), event.value]
                    "
                  />
                  <label 
                    :for="`create-event-${event.value}`"
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
            Criar Webhook
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template> 