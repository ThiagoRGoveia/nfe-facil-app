<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { UPDATE_USER_PASSWORD } from "@/graphql/user";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const auth = useAuthStore();
const userId = computed(() => auth.user?.id);

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
  <v-form
    v-model="isValid"
    @submit.prevent="handleSubmit"
  >
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
          <PasswordInput
            v-model="form.password"
            label="Nova Senha"
            :rules="[rules.required, rules.password]"
            required
            hint="A senha deve conter pelo menos 8 caracteres"
          />
        </v-col>
        <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <PasswordInput
            v-model="form.confirmPassword"
            label="Confirmar Nova Senha"
            :rules="[rules.required, rules.passwordMatch]"
            required
          />
        </v-col>
        <v-col
          cols="12"
          sm="8"
          md="8"
        >
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!isValid"
            :loading="loading"
          >
            Atualizar Senha
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
