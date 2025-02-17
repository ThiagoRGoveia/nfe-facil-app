<script setup lang="ts">
const form = reactive({
  password: "",
  confirmPassword: "",
});

const isValid = ref(false);
const loading = ref(false);

const rules = {
  required: (v: string) => !!v || "This field is required",
  password: (v: string) =>
    v.length >= 8 || "Password must be at least 8 characters",
  passwordMatch: (v: string) => v === form.password || "Passwords must match",
};

const emit = defineEmits<{
  (e: "submit", password: string): void;
}>();

const handleSubmit = () => {
  if (!isValid.value) return;

  loading.value = true;
  emit("submit", form.password);
  loading.value = false;
};
</script>

<template>
  <v-form @submit.prevent="handleSubmit" v-model="isValid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <PasswordInput
            v-model="form.password"
            label="New Password"
            :rules="[rules.required, rules.password]"
            required
            hint="Password must be at least 8 characters long"
          />
        </v-col>
        <v-col cols="12">
          <PasswordInput
            v-model="form.confirmPassword"
            label="Confirm Password"
            :rules="[rules.required, rules.passwordMatch]"
            required
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
            Reset Password
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped>
.v-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
