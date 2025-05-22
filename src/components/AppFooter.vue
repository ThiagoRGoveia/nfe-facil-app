<template>
  <footer class="mt-8 pt-4 bg-background border-t">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-center py-6">
        <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
          <p class="text-sm text-muted-foreground">
            Copyright © {{ currentYear }} – Tera Solutions. Todos os direitos reservados.
          </p>
        </div>
        <div class="w-full sm:w-1/2 flex justify-center sm:justify-end space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            class="text-xs text-muted-foreground" 
            asChild
          >
            <RouterLink to="/privacy">Política de Privacidade</RouterLink>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            class="text-xs text-muted-foreground" 
            asChild
          >
            <RouterLink to="/terms">Termos de Uso</RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';

const currentYear = computed(() => new Date().getFullYear());
</script>