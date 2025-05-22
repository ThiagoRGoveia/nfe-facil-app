<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useLazyQuery } from '@vue/apollo-composable';
import { FIND_ALL_BATCH_PROCESSES } from '@/graphql/history';
import type { PaginatedBatchProcessResponse } from '@/graphql/generated/graphql';

import PrivateConversionForm from '@/components/business/file-conversion/PrivateConversionForm.vue';
import HistoryTable from '@/components/business/file-conversion/HistoryTable.vue';
import WebhooksTable from '@/components/business/webhook/WebhooksTable.vue';
import ProfileCard from '@/components/business/user/ProfileCard.vue';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

import {
  LayoutDashboard,
  History as HistoryIcon,
  UserCircle,
  FileText,
  Key,
  FileJson,
  ChevronRight,
  Loader2,
  AlertCircle,
  Link
} from 'lucide-vue-next';

const router = useRouter();
const auth = useAuthStore();

// Fetch recent conversions for stats
const { load, result } = useLazyQuery<{ findAllBatchProcesses: PaginatedBatchProcessResponse }>(
  FIND_ALL_BATCH_PROCESSES,
  {
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: {
      field: 'createdAt',
      direction: 'DESC',
    },
  },
  {
    fetchPolicy: 'cache-first'
  }
);

// Compute dashboard statistics based on query results
computed(() => {
  if (!result.value) return { total: 0, completed: 0, success: 0 };
  
  const items = result.value.findAllBatchProcesses.items || [];
  const total = result.value.findAllBatchProcesses.total || 0;
  const completed = items.filter(item => item.status === 'COMPLETED').length;
  const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    success: successRate
  };
});

// Load data on component mount
load();
</script>

<template>
  <!-- Option 1: Using a wider max-width -->
  <div class="max-w-[1600px] px-4 py-6 mx-auto">
    <!-- Breadcrumbs -->
    <Breadcrumb class="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    
    <!-- Dashboard Header -->
    <div class="mb-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-3xl flex items-center">
            <LayoutDashboard class="mr-2" />
            Dashboard
          </CardTitle>
        </CardHeader>
      </Card>
    </div>


    <!-- Main dashboard sections -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- File Conversion Section -->
      <div class="lg:col-span-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <FileText class="mr-2" />
              Conversão de Arquivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PrivateConversionForm />
          </CardContent>
        </Card>

        <!-- Recent History Section -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle class="flex items-center">
              <HistoryIcon class="mr-2" />
              Histórico
            </CardTitle>
            <Button 
              variant="ghost" 
              class="flex items-center"
              @click="router.push('/history')"
            >
              Ver Tudo
              <ChevronRight class="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <HistoryTable />
          </CardContent>
        </Card>
        
        <!-- Webhooks Section -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle class="flex items-center">
              <Link class="mr-2" />
              Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WebhooksTable />
          </CardContent>
        </Card>
      </div>

      <!-- Profile & Settings Section -->
      <div class="lg:col-span-4 space-y-6">
        <!-- User Profile Card -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <UserCircle class="mr-2" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent v-if="auth.user">
            <ProfileCard
              :user="auth.user"
              :is-editing="false"
              @toggle-edit="router.push('/profile')"
            />
            <Button
              variant="outline"
              class="w-full mt-4"
              @click="router.push('/profile')"
            >
              Editar Perfil
            </Button>
          </CardContent>
          <CardContent
            v-else
            class="flex justify-center py-8"
          >
            <Loader2 class="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>

        <!-- API Credentials Quick Access -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <Key class="mr-2" />
              Acesso à API
            </CardTitle>
          </CardHeader>
          <CardContent v-if="auth.user">
            <Alert class="mb-4">
              <AlertCircle class="h-4 w-4 mr-2" />
              <AlertDescription>Você tem acesso à API habilitado</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              class="w-full"
              @click="router.push('/profile')"
            >
              Gerenciar Chaves API
            </Button>
          </CardContent>
        </Card>

        <!-- Quick Links Card -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <FileJson class="mr-2" />
              Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                class="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                role="button"
                tabindex="0"
                @click="router.push('/api-doc')"
              >
                <div class="bg-muted h-9 w-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FileText class="h-5 w-5" />
                </div>
                <div>
                  <h4 class="text-sm font-medium leading-none mb-1">
                    Documentação
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    Documentação da API e guias
                  </p>
                </div>
              </div>
              
              <div
                class="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                role="button"
                tabindex="0"
                @click="router.push('/faqs')"
              >
                <div class="bg-muted h-9 w-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FileText class="h-5 w-5" />
                </div>
                <div>
                  <h4 class="text-sm font-medium leading-none mb-1">
                    FAQs
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    Perguntas frequentes
                  </p>
                </div>
              </div>
              
              <div
                class="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md transition-colors"
                role="button"
                tabindex="0"
                @click="router.push('/support')"
              >
                <div class="bg-muted h-9 w-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FileText class="h-5 w-5" />
                </div>
                <div>
                  <h4 class="text-sm font-medium leading-none mb-1">
                    Suporte
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    Entre em contato com nossa equipe de suporte
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  
  <!-- Option 2: Full-width version (uncomment to use) -->
  <!-- 
  <div class="w-full px-4 py-6">
    ... dashboard content ...
  </div>
  -->
</template>

<style scoped>
/* Add any custom styles here */
</style>