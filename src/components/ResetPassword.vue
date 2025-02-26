<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { UPDATE_USER_PASSWORD } from "@/graphql/user";
import { useAuthStore } from "@/stores/auth";
import { computed, ref, reactive, watch } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput.vue";
import { Form } from "@/components/ui/form";

const auth = useAuthStore();
const userId = computed(() => auth.user?.id);
const loading = ref(false);
const errors = reactive({
  password: "",
  confirmPassword: ""
});

const form = reactive({
  password: "",
  confirmPassword: "",
});

const isValid = ref(false);

// Validate form
watch([() => form.password, () => form.confirmPassword], ([password, confirmPassword]) => {
  errors.password = !password ? "Password is required" : 
                    password.length < 8 ? "Password must be at least 8 characters" : "";
  
  errors.confirmPassword = !confirmPassword ? "Confirmation is required" : 
                           confirmPassword !== password ? "Passwords must match" : "";
  
  isValid.value = !errors.password && !errors.confirmPassword && 
                  !!password && !!confirmPassword;
}, { immediate: true });

const { mutate: updatePassword, onDone, onError } = useMutation(UPDATE_USER_PASSWORD);

onDone(() => {
  loading.value = false;
  form.password = "";
  form.confirmPassword = "";
});

onError((error) => {
  loading.value = false;
  console.error("Failed to update password:", error);
});

const handleSubmit = () => {
  if (!isValid.value || !userId.value) return;
  
  loading.value = true;
  updatePassword({
    id: userId.value,
    input: {
      currentPassword: form.password,
      newPassword: form.confirmPassword,
    },
  });
};
</script>

<template>
  <Form class="w-full" @submit.prevent="handleSubmit">
    <Card class="p-6">
      <div class="grid gap-6 md:grid-cols-8">
        <div class="md:col-span-6">
          <div class="space-y-2">
            <label 
              for="password" 
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Nova Senha
            </label>
            <PasswordInput
              id="password"
              v-model="form.password"
              required
              hint="A senha deve conter pelo menos 8 caracteres"
            />
            <p v-if="errors.password" class="text-sm font-medium text-destructive">
              {{ errors.password }}
            </p>
          </div>
        </div>
        
        <div class="md:col-span-6">
          <div class="space-y-2">
            <label 
              for="confirmPassword" 
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmar Nova Senha
            </label>
            <PasswordInput
              id="confirmPassword"
              v-model="form.confirmPassword"
              required
            />
            <p v-if="errors.confirmPassword" class="text-sm font-medium text-destructive">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>
        
        <div class="md:col-span-6">
          <Button
            type="submit"
            class="w-full"
            :disabled="!isValid"
          >
            <span v-if="loading" class="mr-2">
              <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
            </span>
            Atualizar Senha
          </Button>
        </div>
      </div>
    </Card>
  </Form>
</template>

<style scoped>
form {
  width: 100%;
  margin: 0;
}
</style>
