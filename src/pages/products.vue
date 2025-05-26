<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="min-h-screen bg-background  py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-center mb-3 text-neutral-900 dark:text-neutral-100">
        Preços por Lotes de Notas
      </h1>
      <p class="text-center text-lg text-neutral-700 dark:text-neutral-300 mb-10">
        Sem burocracia. Sem lentidão.
      </p>
      <div class="flex flex-col md:flex-row justify-center gap-8">
        <!-- Pacote Básico -->
        <Card class="flex-1 max-w-sm mx-auto shadow-md border rounded-xl bg-card dark:bg-neutral-800/90">
          <CardHeader>
            <CardTitle class="text-lg font-semibold">
              Pacote Básico
            </CardTitle>
            <CardDescription class="text-sm text-neutral-600 dark:text-neutral-400">
              com 100 créditos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-end mb-2">
              <span class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mr-1">R$</span>
              <span class="text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight">0,15</span>
              <span class="ml-2 text-xs text-neutral-600 dark:text-neutral-400">preço por crédito<br>impostos inclusos</span>
            </div>
            <Button 
              class="w-full mt-4 bg-[#ff7300] hover:bg-[#ff8c1a] text-white font-semibold"
              @click="redirectToPurchase('basic')"
            >
              Comprar agora
            </Button>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              R$ 0,15/crédito
            </p>
            <Separator class="my-6" />
            <ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para Excel
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para CSV
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para JSON
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Créditos não expiram
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Suporte por email
              </li>
            </ul>
          </CardContent>
        </Card>
        <!-- Pacote Padrão -->
        <Card class="flex-1 max-w-sm mx-auto shadow-md border rounded-xl bg-card dark:bg-neutral-800/90">
          <CardHeader>
            <CardTitle class="text-lg font-semibold">
              Pacote Padrão
            </CardTitle>
            <CardDescription class="text-sm text-neutral-600 dark:text-neutral-400">
              com 200 créditos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-end mb-2">
              <span class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mr-1">R$</span>
              <span class="text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight">0,12</span>
              <span class="ml-2 text-xs text-neutral-600 dark:text-neutral-400">preço por crédito<br>impostos inclusos</span>
            </div>
            <Button 
              variant="outline" 
              class="w-full mt-4 font-semibold border-[#ff7300] text-[#ff7300]"
              @click="redirectToPurchase('standard')"
            >
              Comprar agora
            </Button>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              R$ 0,12/crédito
            </p>
            <Separator class="my-6" />
            <ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para Excel
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para CSV
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para JSON
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Créditos não expiram
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Suporte por email
              </li>
            </ul>
          </CardContent>
        </Card>
        <!-- Pacote Mega -->
        <Card class="flex-1 max-w-sm mx-auto shadow-lg border-2 border-[#ff7300] rounded-xl bg-card dark:bg-neutral-800/90">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-[#ff7300]">
              Pacote Mega
            </CardTitle>
            <CardDescription class="text-sm text-neutral-600 dark:text-neutral-400">
              com 500 créditos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-end mb-2">
              <span class="text-3xl font-bold text-[#ff7300] mr-1">R$</span>
              <span class="text-5xl font-extrabold text-[#ff7300] leading-tight">0,10</span>
              <span class="ml-2 text-xs text-neutral-600 dark:text-neutral-400">preço por crédito<br>impostos inclusos</span>
            </div>
            <Button 
              class="w-full mt-4 bg-[#ff7300] hover:bg-[#ff8c1a] text-white font-semibold"
              @click="redirectToPurchase('mega')"
            >
              Comprar agora
            </Button>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              R$ 0,10/crédito
            </p>
            <Separator class="my-6" />
            <ul class="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para Excel
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para CSV
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Exportação para JSON
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Créditos não expiram
              </li>
              <li class="flex items-center">
                <Check class="h-4 w-4 text-green-600 mr-2" /> Suporte por email
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

async function redirectToPurchase(product: 'basic' | 'standard' | 'mega') {
  // If user is already authenticated, redirect directly to checkout
  if (auth.isAuthenticated) {
    router.push(`/checkout?product=${product}`);
  } else {
    // Otherwise, redirect to login with purchase parameters
    // Our login page will preserve these parameters through Auth0 authentication
    router.push(`/login?ref=purchase&product=${product}`);
  }
}
</script>
