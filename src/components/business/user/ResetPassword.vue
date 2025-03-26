<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { UPDATE_USER_PASSWORD } from "@/graphql/user";
import { useAuthStore } from "@/stores/auth";
import { computed, ref, reactive } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput.vue";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";

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

// Function to validate password
const validateForm = () => {
  // Password validation
  if (!form.password) {
    errors.password = "Password is required";
    return false;
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
    return false;
  } else {
    errors.password = "";
  }
  
  // Confirm password validation
  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirmation is required";
    return false;
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords must match";
    return false;
  } else {
    errors.confirmPassword = "";
  }
  
  return true;
};

// Create a computed property that calls the validation function
const isValid = computed(() => validateForm());

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
  <Form
    class="w-full"
    novalidate
    @submit="handleSubmit"
  >
    <Card class="shadow-none border-0">
      <CardContent class="pt-6">
        <div class="space-y-4">
          <FormField name="password">
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  id="password"
                  v-model="form.password"
                  required
                />
              </FormControl>
              <FormMessage v-if="errors.password">
                {{ errors.password }}
              </FormMessage>
              <FormDescription>A senha deve conter pelo menos 8 caracteres</FormDescription>
            </FormItem>
          </FormField>

          <FormField name="confirmPassword">
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  required
                />
              </FormControl>
              <FormMessage v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
              </FormMessage>
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="w-full"
            :disabled="!isValid"
          >
            <span
              v-if="loading"
              class="mr-2"
            >
              <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]" />
            </span>
            {{ loading ? 'Atualizando...' : 'Atualizar Senha' }}
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
