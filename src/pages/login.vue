<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  const { loginWithRedirect } = useAuth0()
  const route = useRoute()

  // Get the original redirect URL if present
  const redirectPath = route.query.redirect as string | undefined
  
  // Get purchase related query params if present
  const refParam = route.query.ref as string | undefined
  const productParam = route.query.product as string | undefined
  
  // Create appState to preserve through auth flow
  const appState = {
    // Store the original redirect path if present
    returnTo: redirectPath,
    // Store purchase params if present
    purchaseRef: refParam,
    purchaseProduct: productParam
  }
  
  // Redirect to Auth0 login with our appState
  loginWithRedirect({
    appState
  })
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