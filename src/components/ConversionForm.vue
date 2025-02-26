<script setup lang="ts">
import { ref } from "vue";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FileFormat } from "@/graphql/generated/graphql";
import FileUploader from "./FileUploader.vue";

interface Props {
  title: string;
}

defineProps<Props>();

const files = ref<File[]>([]);
const selectedFormats = ref<FileFormat[]>(['JSON']);
const formError = ref("");

const outputFormats = [
  { label: "JSON", value: "JSON" },
  { label: "CSV", value: "CSV" },
  { label: "XLSX", value: "XLSX" },
];

const emit = defineEmits<{
  (e: "submit", data: { files: File[]; formats: FileFormat[] }): void;
}>();

const toggleFormat = (format: FileFormat, checked: boolean) => {
  if (checked) {
    selectedFormats.value.push(format);
  } else {
    selectedFormats.value = selectedFormats.value.filter(f => f !== format);
  }
};

const isFormatSelected = (format: FileFormat) => {
  return selectedFormats.value.includes(format);
};

const handleSubmit = () => {
  // Reset previous errors
  formError.value = "";
  
  // Validate form
  if (files.value.length === 0) {
    formError.value = "Please upload at least one file";
    return;
  }
  
  if (selectedFormats.value.length === 0) {
    formError.value = "Please select at least one output format";
    return;
  }
  
  emit("submit", {
    files: files.value,
    formats: selectedFormats.value,
  });
};
</script>

<template>
  <Form @submit.prevent="handleSubmit" class="h-full">
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      
      <CardContent class="flex flex-col space-y-6 flex-grow">
        <FormField name="files">
          <FormItem>
            <FormControl>
              <FileUploader
                v-model:files="files"
                accept=".pdf,.zip"
                class="flex-grow"
              />
            </FormControl>
            <FormMessage v-if="files.length === 0 && formError">
              {{ formError }}
            </FormMessage>
          </FormItem>
        </FormField>

        <FormField name="formats">
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
                  :checked="isFormatSelected(format.value as FileFormat)"
                  @update:checked="(checked: boolean) => toggleFormat(format.value as FileFormat, checked)"
                />
                <Label 
                  :for="`format-${format.value}`"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ format.label }}
                </Label>
              </div>
            </div>
            <FormMessage v-if="selectedFormats.length === 0 && formError">
              {{ formError }}
            </FormMessage>
          </FormItem>
        </FormField>
      </CardContent>
      
      <CardFooter>
        <Button
          type="submit"
          class="w-full"
          :disabled="files.length === 0 || selectedFormats.length === 0"
        >
          Extrair dados
        </Button>
      </CardFooter>
    </Card>
  </Form>
</template>

<style scoped>
form {
  height: 100%;
}
</style>
