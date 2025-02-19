<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { REFRESH_CLIENT_SECRET } from '@/graphql/user';
import type { User } from '@/graphql/generated/graphql';

const props = defineProps<{
  user: User;
}>();

const showSecret = ref(false);
const isRefreshing = ref(false);
const clientId = computed(() => props.user.clientId);
const clientSecret = computed(() => props.user.clientSecret);

const { mutate: refreshSecret } = useMutation(REFRESH_CLIENT_SECRET);

const toggleSecret = () => {
  showSecret.value = !showSecret.value;
};

const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text);
};

const handleRefreshSecret = async () => {
  isRefreshing.value = true;
  try {
    await refreshSecret({
      id: props.user.id
    });
  } catch (error) {
    console.error('Failed to refresh client secret:', error);
  } finally {
    isRefreshing.value = false;
    showSecret.value = false;
  }
};

const maskedSecret = (secret: string) => {
  return '•'.repeat(secret.length);
};
</script>

<template>
  <v-form>
    <v-card
      class="pa-4"
      elevation="0"
    >
      <v-row>
        <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <v-text-field
            :model-value="clientId"
            label="Client ID"
            readonly
            variant="outlined"
            density="comfortable"
            hide-details
            class="mb-4"
          >
            <template #append-inner>
              <v-btn
                icon
                variant="text"
                @click="() => copyToClipboard(clientId)"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <v-text-field
            :model-value="showSecret ? clientSecret : maskedSecret(clientSecret)"
            label="Client Secret"
            readonly
            variant="outlined"
            density="comfortable"
            hide-details
            class="mb-4"
          >
            <template #append-inner>
              <div class="d-flex gap-2">
                <v-btn
                  icon
                  variant="text"
                  @click="toggleSecret"
                >
                  <v-icon>
                    {{ showSecret ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  variant="text"
                  :disabled="!showSecret"
                  @click="() => showSecret && copyToClipboard(clientSecret)"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </div>
            </template>
          </v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <v-btn
            :loading="isRefreshing"
            :disabled="isRefreshing"
            color="primary"
            type="submit"
            block
            @click.prevent="handleRefreshSecret"
          >
            {{ isRefreshing ? 'Atualizando...' : 'Renovar Client Secret' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<style scoped>
.v-form {
  width: 100%;
  margin: 0;
}
</style> 