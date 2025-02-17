<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  rules?: ((v: string) => boolean | string)[];
  hint?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Password",
  rules: () => [],
  required: false,
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
    @update:model-value="updateValue"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    :label="label"
    :rules="rules"
    variant="outlined"
    :required="required"
    @click:append="showPassword = !showPassword"
    :hint="hint"
  />
</template>
