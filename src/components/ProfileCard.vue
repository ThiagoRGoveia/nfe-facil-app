<script setup lang="ts">
import type { User } from '@/graphql/generated/graphql';


const props = defineProps<{
  user: User;
}>();

const fullName = computed(() => `${props.user.name} ${props.user.surname}`);

</script>

<template>
  <v-card class="profile-card">
    <v-card-title class="text-h5 pb-2"> Hello {{ fullName }} </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" class="me-3">mdi-email</v-icon>
          </template>
          <v-list-item-title>Email</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" class="me-3">mdi-login</v-icon>
          </template>
          <v-list-item-title>Sign-up Method</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" class="me-3">mdi-star</v-icon>
          </template>
          <v-list-item-title>Current Plan</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary" class="me-3">mdi-currency-usd</v-icon>
          </template>
          <v-list-item-title>Available Credits</v-list-item-title>
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

<style scoped>
.profile-card {
  max-width: 600px;
  margin: 0 auto;
}

.v-list-item {
  min-height: 64px;
}
</style>
