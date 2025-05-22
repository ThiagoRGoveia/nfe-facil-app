<script setup lang="ts">
import { ref } from "vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { RouterLink } from "vue-router";

interface BatchProcess {
  id: string;
  status: string;
  totalFiles: number;
  processedFiles: number;
  createdAt: string;
}

const selectedProcess = ref<BatchProcess | null>(null);

const handleRowClick = (item: BatchProcess) => {
  selectedProcess.value = item;
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <Breadcrumb class="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <RouterLink to="/">
              Dashboard
            </RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Histórico</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    
    <div class="mb-8">
      <h1 class="text-2xl font-bold">
        Processing History
      </h1>
      <p class="text-muted-foreground">
        Ver histórico de processamento de arquivos
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Processing History</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryTable @row-click="handleRowClick" />
        </CardContent>
      </Card>
    </div>
  </div>
</template> 