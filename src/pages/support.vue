<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">Suporte</h1>
    <p class="text-muted-foreground mb-6">Estamos aqui para ajudar com qualquer dúvida sobre o NFe Fácil</p>
    <Separator class="mb-8" />
    
    <div class="max-w-2xl mx-auto">
      <Collapsible default-open class="mb-8">
        <CollapsibleTrigger asChild>
          <div class="flex items-center justify-between bg-card p-4 rounded-lg shadow-sm cursor-pointer hover:bg-accent/50 transition-colors">
            <div class="flex items-center">
              <MessageCircle class="h-5 w-5 mr-2 text-primary" />
              <h2 class="text-xl font-semibold">Formulário de Contato</h2>
            </div>
            <ChevronDown class="h-4 w-4 transition-transform duration-200" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent class="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Entre em contato</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para enviar uma mensagem para nossa equipe de suporte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitForm">
                <div class="grid gap-6">
                  <!-- Nome -->
                  <div class="grid gap-2">
                    <Label for="name">Nome</Label>
                    <Input 
                      id="name" 
                      v-model="form.name" 
                      placeholder="Seu nome completo"
                      :disabled="isSubmitting"
                      required
                    />
                    <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
                  </div>
                  
                  <!-- Email -->
                  <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      v-model="form.email" 
                      placeholder="seu.email@exemplo.com"
                      :disabled="isSubmitting"
                      required
                    />
                    <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
                  </div>
                  
                  <!-- Assunto -->
                  <div class="grid gap-2">
                    <Label for="subject">Assunto</Label>
                    <Input 
                      id="subject" 
                      v-model="form.subject" 
                      placeholder="Assunto da mensagem"
                      :disabled="isSubmitting"
                      required
                    />
                    <p v-if="errors.subject" class="text-sm text-destructive">{{ errors.subject }}</p>
                  </div>
                  
                  <!-- Mensagem -->
                  <div class="grid gap-2">
                    <Label for="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      v-model="form.message" 
                      placeholder="Descreva sua dúvida ou problema em detalhes..."
                      :rows="6"
                      :disabled="isSubmitting"
                      required
                    />
                    <p v-if="errors.message" class="text-sm text-destructive">{{ errors.message }}</p>
                  </div>
                  
                  <!-- Status da submissão -->
                  <Alert 
                    v-if="submissionStatus.show"
                    :variant="submissionStatus.type">
                    <AlertCircle v-if="submissionStatus.type === 'destructive'" class="h-4 w-4 mr-2" />
                    <CheckCircle v-else class="h-4 w-4 mr-2" />
                    {{ submissionStatus.message }}
                  </Alert>
                  
                  <!-- Botão de envio -->
                  <Button 
                    type="submit" 
                    class="w-full"
                    :disabled="isSubmitting"
                  >
                    <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                    {{ isSubmitting ? 'Enviando...' : 'Enviar mensagem' }}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      
      <!-- Informações adicionais -->
      <div class="mb-6">
        <div class="flex items-center mb-4">
          <PhoneCall class="h-5 w-5 mr-2 text-primary" />
          <h2 class="text-xl font-semibold">Outras formas de contato</h2>
        </div>
        <Separator class="mb-6" />
        <div class="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <Mail class="mr-2 h-5 w-5" /> 
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Para assuntos relacionados ao nosso produto, envie um email para:
              </p>
              <p class="font-medium mt-1">contact@wearetera.com</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center">
                <HelpCircle class="mr-2 h-5 w-5" /> 
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Consulte nossas perguntas frequentes para respostas rápidas sobre o NFe Fácil.
              </p>
              <Button variant="outline" class="mt-2" asChild>
                <RouterLink to="/faqs">Consultar FAQ</RouterLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <!-- Dicas rápidas -->
      <Collapsible class="mb-6">
        <CollapsibleTrigger asChild>
          <div class="flex items-center justify-between bg-card p-4 rounded-lg shadow-sm cursor-pointer hover:bg-accent/50 transition-colors">
            <div class="flex items-center">
              <Lightbulb class="h-5 w-5 mr-2 text-amber-500" />
              <h2 class="text-xl font-semibold">Dicas rápidas</h2>
            </div>
            <ChevronDown class="h-4 w-4 transition-transform duration-200" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent class="pt-4 space-y-3">
          <div class="bg-muted p-4 rounded-lg">
            <h3 class="font-medium mb-1">Horário de atendimento</h3>
            <p class="text-sm text-muted-foreground">Nossa equipe de suporte está disponível de segunda a sexta, das 9h às 18h (horário de Brasília).</p>
          </div>
          <div class="bg-muted p-4 rounded-lg">
            <h3 class="font-medium mb-1">Tempo de resposta</h3>
            <p class="text-sm text-muted-foreground">Respondemos a maioria das mensagens em até 24 horas úteis.</p>
          </div>
          <div class="bg-muted p-4 rounded-lg">
            <h3 class="font-medium mb-1">Antes de nos contatar</h3>
            <p class="text-sm text-muted-foreground">Verifique nossa <RouterLink to="/faqs" class="text-primary hover:underline">página de FAQ</RouterLink> para ver se sua dúvida já foi respondida.</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { RouterLink } from 'vue-router';
import { 
  Mail, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  MessageCircle,
  ChevronDown,
  PhoneCall,
  Lightbulb
} from 'lucide-vue-next';

// Form state
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

// Validation errors
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

// Submission state
const isSubmitting = ref(false);
const submissionStatus = reactive({
  show: false,
  type: 'default' as 'default' | 'destructive',
  message: ''
});

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  errors.name = '';
  errors.email = '';
  errors.subject = '';
  errors.message = '';
  
  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório';
    isValid = false;
  }
  
  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email é obrigatório';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Por favor, forneça um email válido';
    isValid = false;
  }
  
  // Validate subject
  if (!form.subject.trim()) {
    errors.subject = 'Assunto é obrigatório';
    isValid = false;
  }
  
  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Mensagem é obrigatória';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const submitForm = async () => {
  // Reset submission status
  submissionStatus.show = false;
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Set loading state
  isSubmitting.value = true;
  
  try {
    // Extract base URL from the GraphQL URL
    const baseUrl = import.meta.env.VITE_GRAPHQL_URL.replace('graphql', '');
    const endpoint = `${baseUrl}public/contact-form`;
    
    // Submit form data
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      })
    });
    
    if (!response.ok) {
      throw new Error('Falha ao enviar o formulário');
    }
    
    // Show success message
    submissionStatus.show = true;
    submissionStatus.type = 'default';
    submissionStatus.message = 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.';
    
    // Reset form
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    
  } catch (error) {
    // Show error message
    submissionStatus.show = true;
    submissionStatus.type = 'destructive';
    submissionStatus.message = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
    console.error('Error submitting form:', error);
  } finally {
    // Reset loading state
    isSubmitting.value = false;
  }
};
</script>
