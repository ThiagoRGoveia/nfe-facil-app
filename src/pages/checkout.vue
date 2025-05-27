<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Get the product from the URL
    const product = route.query.product as string
    
    // Validate product type
    if (!product || !['basic', 'standard', 'mega'].includes(product)) {
      error.value = 'Produto inválido ou não especificado'
      isLoading.value = false
      return
    }
    
    // Get user info to pass as customer reference
    if (!auth.isAuthenticated) {
      error.value = 'Você precisa estar autenticado para continuar'
      isLoading.value = false
      return
    }
    
    // Get the corresponding Stripe URL from environment variables
    let stripeUrl = ''
    switch (product) {
      case 'basic':
        stripeUrl = import.meta.env.VITE_STRIPE_BASIC_URL
        break
      case 'standard':
        stripeUrl = import.meta.env.VITE_STRIPE_STANDARD_URL
        break
      case 'mega':
        stripeUrl = import.meta.env.VITE_STRIPE_MEGA_URL
        break
    }
    
    if (!stripeUrl) {
      error.value = 'URL de pagamento não configurada para este produto'
      isLoading.value = false
      return
    }
    
    // Append the user ID as customer reference
    const userId = auth.user?.id
    const finalUrl = `${stripeUrl}${stripeUrl.includes('?') ? '&' : '?'}client_reference_id=${userId}`
    
    // Open Stripe checkout in a new tab and redirect current tab to home
    window.open(finalUrl, '_blank', 'noopener')
    router.replace('/')
    
  } catch (err) {
    console.error('Error redirecting to Stripe:', err)
    error.value = 'Ocorreu um erro ao redirecionar para o pagamento'
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4">
    <div
      v-if="isLoading"
      class="text-center"
    >
      <div class="flex justify-center">
        <div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
      <h2 class="text-2xl font-semibold mt-6 mb-2">
        Redirecionando para pagamento
      </h2>
      <p class="text-muted-foreground">
        Por favor, aguarde enquanto preparamos sua compra...
      </p>
    </div>
    
    <div
      v-else-if="error"
      class="text-center max-w-md"
    >
      <div class="bg-destructive/15 text-destructive p-4 rounded-lg mb-4">
        <p class="font-medium">
          {{ error }}
        </p>
      </div>
      <p class="mb-4">
        Desculpe pelo inconveniente. Por favor, tente novamente ou entre em contato com nosso suporte.
      </p>
      <div class="flex gap-3 justify-center">
        <a
          href="/"
          class="inline-flex items-center px-4 py-2 border border-primary/20 rounded-md hover:bg-primary/5"
        >
          Voltar ao início
        </a>
        <a
          href="/support"
          class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Contatar suporte
        </a>
      </div>
    </div>
  </div>
</template>
