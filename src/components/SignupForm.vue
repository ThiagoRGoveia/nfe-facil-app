<template>
  <v-form @submit.prevent="handleSubmit" v-model="isValid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name"
            label="Name"
            :rules="[rules.required]"
            variant="outlined"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.surname"
            label="Surname"
            :rules="[rules.required]"
            variant="outlined"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            required
          />
        </v-col>
        <v-col cols="12">
          <PasswordInput
            v-model="form.password"
            label="Password"
            :rules="[rules.required, rules.password]"
            required
            hint="Password must be at least 8 characters long"
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!isValid"
            :loading="loading"
          >
            Sign Up
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
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

const rules = {
  required: (v: string) => !!v || "This field is required",
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(v) || "Please enter a valid email";
  },
  password: (v: string) => {
    return v.length >= 8 || "Password must be at least 8 characters";
  },
};

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
.v-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
