<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

interface Props {
  id?: string;
  modelValue: string;
  label?: string;
  rules?: ((v: string) => boolean | string)[];
  hint?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  rules: () => [],
  required: false,
  hint: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const showPassword = ref(false);

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="space-y-2">
    <Label
      v-if="label"
      :for="label?.toLowerCase().replace(' ', '-')"
    >
      {{ label }} <span
        v-if="required"
        class="text-destructive"
      >*</span>
    </Label>
    
    <div class="relative">
      <Input
        :id="id"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :required="required"
        class="pr-10"
        @input="updateValue"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
        @click="togglePasswordVisibility"
      >
        <EyeIcon
          v-if="showPassword"
          class="h-4 w-4"
        />
        <EyeOffIcon
          v-else
          class="h-4 w-4"
        />
      </Button>
    </div>
    
    <p
      v-if="hint"
      class="text-sm text-muted-foreground"
    >
      {{ hint }}
    </p>
  </div>
</template>
