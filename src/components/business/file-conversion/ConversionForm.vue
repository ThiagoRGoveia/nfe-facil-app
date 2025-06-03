<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FileFormat } from "@/graphql/generated/graphql";
import FileUploader from "./FileUploader.vue";

interface Props {
  title?: string;
  maxFiles?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  maxFiles: 10,
});

type ValidFormat = 'JSON' | 'CSV' | 'XLSX';

interface FormValues {
  files: File[];
  formats: ValidFormat[];
}


const outputFormats = [
  { label: "JSON", value: "JSON" as const },
  { label: "CSV", value: "CSV" as const },
  { label: "XLSX", value: "XLSX" as const },
];

const formSchema = toTypedSchema(z.object({
  files: z.array(z.instanceof(File)).min(1, "Por favor, selecione pelo menos um arquivo"),
  formats: z.array(z.enum(['JSON', 'CSV', 'XLSX'])).min(1, "Por favor, selecione pelo menos um formato de saída")
}));

const form = useForm<FormValues>({
  validationSchema: formSchema,
  initialValues: {
    files: [],
    formats: ['JSON']
  }
});

const emit = defineEmits<{
  (e: "submit", data: { files: File[]; formats: FileFormat[] }): void;
}>();

const toggleFormat = (format: ValidFormat, checked: boolean | 'indeterminate') => {
  if (checked === 'indeterminate') {
    return;
  }
  const currentFormats = form.values.formats ?? [];
  if (checked) {
    form.setFieldValue('formats', [...currentFormats, format]);
  } else {
    form.setFieldValue('formats', currentFormats.filter(f => f !== format));
  }
};

const onSubmit = form.handleSubmit((values: FormValues) => {
  // Uncomment to enable emit when ready
  emit("submit", {
    files: values.files,
    formats: values.formats as FileFormat[],
  });
});
</script>

<template>
  <form
    class="h-full"
    @submit="onSubmit"
  >
    <Card class="h-full shadow-none border-0">
      <CardHeader v-if="props.title">
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      
      <CardContent class="flex flex-col space-y-6 flex-grow">
        <FormField
          name="files"
        >
          <FormItem>
            <FormControl>
              <FileUploader
                :files="form.values.files"
                accept=".pdf,.zip"
                class="flex-grow"
                :max-files="props.maxFiles"
                @update:files="(newFiles) => form.setFieldValue('files', newFiles)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          name="formats"
        >
          <FormItem>
            <FormLabel class="text-base font-medium mb-2 block">
              Escolha os formatos desejados
            </FormLabel>
            
            <div class="flex flex-wrap gap-4 mt-2">
              <div 
                v-for="format in outputFormats"
                :key="format.value"
                class="flex items-center space-x-2"
              >
                <Checkbox 
                  :id="`format-${format.value}`"
                  :model-value="form.values.formats.includes(format.value)"
                  @update:model-value="(checked: boolean | 'indeterminate') => toggleFormat(format.value, checked)"
                />
                <Label 
                  :for="`format-${format.value}`"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ format.label }}
                </Label>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <p class="text-xs text-muted-foreground mt-4 px-1 text-left text-red-500">
          *Utilizamos IA para extrair dados. Verifique sempre os resultados, pois podem ocorrer imprecisões.
        </p>
      </CardContent>
      
      <CardFooter>
        <Button
          type="submit"
          class="w-full"
        >
          Extrair dados
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<style scoped>
form {
  height: 100%;
}
</style>
