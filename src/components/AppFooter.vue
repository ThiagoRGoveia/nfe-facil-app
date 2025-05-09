<template>
  <v-footer class="mt-8 pt-4 bg-surface">
    <v-container>
      <v-row
        justify="space-between"
        align="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <div class="text-body-2 text-medium-emphasis">
            Copyright © {{ currentYear }} – Tera Solutions. Todos os direitos reservados.
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="d-flex justify-end"
        >
          <v-btn
            variant="text"
            class="text-caption text-medium-emphasis me-2"
            to="/privacy"
          >
            Política de Privacidade
          </v-btn>
          <v-btn
            variant="text"
            class="text-caption text-medium-emphasis"
            to="/terms"
          >
            Termos de Uso
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script> 