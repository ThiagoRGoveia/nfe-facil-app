<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  rules?: ((v: string) => boolean | string)[];
  hint?: string;
  required?: boolean;
}

 withDefaults(defineProps<Props>(), {
  label: "Password",
  rules: () => [],
  required: false,
  hint: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const showPassword = ref(false);

const updateValue = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    :type="showPassword ? 'text' : 'password'"
    :label="label"
    :rules="rules"
    variant="outlined"
    :required="required"
    :hint="hint"
    @update:model-value="updateValue"
    @click:append="showPassword = !showPassword"
  >
    <template #append-inner>
      <v-btn
        icon
        variant="text"
      >
        <v-icon>{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>
