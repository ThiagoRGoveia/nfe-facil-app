<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Get the authentication URL from environment variables
  const authUrl = import.meta.env.VITE_AUTH_URL
  
  // Redirect to the authentication URL
  window.location.href = authUrl
})
</script>

<template>
  <v-container
    fluid
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
      >
        <v-card class="elevation-12 rounded-lg pa-6">
          <v-card-title class="text-center text-h5 mb-4">
            Redirecionando para autenticação
          </v-card-title>
          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            />
            <p class="mt-6">
              Por favor, aguarde...
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> 