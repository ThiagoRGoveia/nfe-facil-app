<script setup lang="ts">
import type { User } from '@/graphql/generated/graphql';


const props = defineProps<{
  user: User;
}>();

const fullName = computed(() => `${props.user.name} ${props.user.surname}`);

</script>

<template>
  <v-card elevation="2">
    <v-card-title class="text-h5">
      Olá {{ fullName }}
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon
              color="primary"
              class="mr-3"
            >
              mdi-email
            </v-icon>
          </template>
          <v-list-item-title>Email</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon
              color="primary"
              class="mr-3"
            >
              mdi-login
            </v-icon>
          </template>
          <v-list-item-title>Sign-up Method</v-list-item-title>
          <v-list-item-subtitle>{{ user.isSocial ? 'Social' : 'Email' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon
              color="primary"
              class="mr-3"
            >
              mdi-star
            </v-icon>
          </template>
          <v-list-item-title>Plano</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon
              color="primary"
              class="mr-3"
            >
              mdi-currency-usd
            </v-icon>
          </template>
          <v-list-item-title>Créditos Disponíveis</v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              :color="user.credits > 0 ? 'success' : 'error'"
              size="small"
              class="mt-1"
            >
              {{ user.credits }} credits
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
