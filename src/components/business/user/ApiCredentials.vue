<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { REFRESH_CLIENT_SECRET } from '@/graphql/user';
import type { User } from '@/graphql/generated/graphql';
import { Copy, Eye, EyeOff, RefreshCw, CheckCircle2 } from 'lucide-vue-next';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, Form } from '@/components/ui/form';

const props = defineProps<{
  user: User;
}>();

const showSecret = ref(false);
const isRefreshing = ref(false);
const clientId = computed(() => props.user.clientId);
const localClientSecret = ref(props.user.clientSecret);
const clientSecret = computed(() => localClientSecret.value);
const showCopiedClientId = ref(false);
const showCopiedClientSecret = ref(false);

const { mutate: refreshSecret } = useMutation<{ refreshUserClientSecret: { clientSecret: string } }>(REFRESH_CLIENT_SECRET, {
  update: (cache, { data }) => {
    if (data?.refreshUserClientSecret) {
      localClientSecret.value = data.refreshUserClientSecret.clientSecret;
    }
  },
});

const toggleSecret = () => {
  showSecret.value = !showSecret.value;
};

const copyToClipboard = (text: string, type: 'clientId' | 'clientSecret') => {
  window.navigator.clipboard.writeText(text);
  if (type === 'clientId') {
    showCopiedClientId.value = true;
  } else {
    showCopiedClientSecret.value = true;
  }
  setTimeout(() => {
    if (type === 'clientId') {
      showCopiedClientId.value = false;
    } else {
      showCopiedClientSecret.value = false;
    }
  }, 2000);
};

const handleRefreshSecret = async () => {
  isRefreshing.value = true;
  try {
    const result = await refreshSecret({
      id: props.user.id
    });
    if (result && 'data' in result) {
      if (result.data?.refreshUserClientSecret) {
        localClientSecret.value = result.data.refreshUserClientSecret.clientSecret;
        showSecret.value = true; // Show the new secret automatically
      }
    }
  } catch (error) {
    console.error('Failed to refresh client secret:', error);
  } finally {
    isRefreshing.value = false;
  }
};

const maskedSecret = (secret: string) => {
  return '•'.repeat(secret.length);
};
</script>

<template>
  <Form class="w-full" novalidate>
    <Card class="shadow-none border-0">
      <CardContent class="pt-6">
        <div class="space-y-4">
          <FormField name="client-id">
            <FormItem>
              <FormLabel for="client-id">
                Client ID
              </FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    id="client-id"
                    :value="clientId"
                    class="pr-10"
                    disabled
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    @click="() => copyToClipboard(clientId, 'clientId')"
                  >
                    <CheckCircle2
                      v-if="showCopiedClientId"
                      class="h-4 w-4 text-green-500"
                    />
                    <Copy
                      v-else
                      class="h-4 w-4"
                    />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          </FormField>
          
          <FormField name="client-secret">
            <FormItem>
              <FormLabel for="client-secret">
                Client Secret
              </FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    id="client-secret"
                    :value="showSecret ? clientSecret : maskedSecret(clientSecret)"
                    class="pr-20"
                    disabled
                  />
                  <div class="absolute right-1 top-1/2 transform -translate-y-1/2 flex">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8"
                      @click="toggleSecret"
                    >
                      <EyeOff
                        v-if="showSecret"
                        class="h-4 w-4"
                      />
                      <Eye
                        v-else
                        class="h-4 w-4"
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8"
                      :disabled="!showSecret"
                      @click="() => showSecret && copyToClipboard(clientSecret, 'clientSecret')"
                    >
                      <CheckCircle2
                        v-if="showCopiedClientSecret"
                        class="h-4 w-4 text-green-500"
                      />
                      <Copy
                        v-else
                        class="h-4 w-4"
                      />
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Your secret key for API authentication. Keep it secure.
              </FormDescription>
            </FormItem>
          </FormField>
          
          <Button
            type="button"
            class="w-full mt-4"
            :disabled="isRefreshing"
            @click="handleRefreshSecret"
          >
            <RefreshCw
              v-if="isRefreshing"
              class="mr-2 h-4 w-4 animate-spin"
            />
            <span>{{ isRefreshing ? 'Atualizando...' : 'Renovar Client Secret' }}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  </Form>
</template>

<style scoped>
form {
  width: 100%;
  margin: 0;
}
</style> 