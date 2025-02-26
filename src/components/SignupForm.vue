<template>
  <Form class="w-full max-w-3xl mx-auto" @submit.prevent="handleSubmit">
    <div class="grid gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="form.name"
            type="text"
            required
          />
          <p v-if="errors.name" class="text-sm font-medium text-destructive">
            {{ errors.name }}
          </p>
        </div>
        <div class="space-y-2">
          <Label for="surname">Surname</Label>
          <Input
            id="surname"
            v-model="form.surname"
            type="text"
            required
          />
          <p v-if="errors.surname" class="text-sm font-medium text-destructive">
            {{ errors.surname }}
          </p>
        </div>
      </div>
      
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="form.email"
          type="email"
          required
        />
        <p v-if="errors.email" class="text-sm font-medium text-destructive">
          {{ errors.email }}
        </p>
      </div>
      
      <div class="space-y-2">
        <PasswordInput
          v-model="form.password"
          label="Password"
          required
          hint="Password must be at least 8 characters long"
        />
        <p v-if="errors.password" class="text-sm font-medium text-destructive">
          {{ errors.password }}
        </p>
      </div>
      
      <Button
        type="submit"
        class="w-full"
        :disabled="!isValid"
      >
        <span v-if="loading" class="mr-2">
          <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]"></span>
        </span>
        Sign Up
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import PasswordInput from './PasswordInput.vue';

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const isValid = ref(false);
const loading = ref(false);

const form = reactive<FormData>({
  name: "",
  surname: "",
  email: "",
  password: "",
});

const errors = reactive({
  name: "",
  surname: "",
  email: "",
  password: ""
});

// Validate form
watch([() => form.name, () => form.surname, () => form.email, () => form.password], 
  ([name, surname, email, password]) => {
    // Validate name
    errors.name = !name ? "Name is required" : "";
    
    // Validate surname
    errors.surname = !surname ? "Surname is required" : "";
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errors.email = !email ? "Email is required" : 
                   !emailRegex.test(email) ? "Please enter a valid email" : "";
    
    // Validate password
    errors.password = !password ? "Password is required" : 
                      password.length < 8 ? "Password must be at least 8 characters" : "";
    
    // Set form validity
    isValid.value = !errors.name && !errors.surname && 
                    !errors.email && !errors.password && 
                    !!name && !!surname && !!email && !!password;
  },
  { immediate: true }
);

const emit = defineEmits<{
  (e: "submit", data: FormData): void;
}>();

const handleSubmit = () => {
  if (!isValid.value) return;

  loading.value = true;
  emit("submit", { ...form });
  loading.value = false;
};
</script>

<style scoped>
form {
  width: 100%;
}
</style>
