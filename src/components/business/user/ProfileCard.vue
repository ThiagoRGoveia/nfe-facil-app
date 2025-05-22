<script setup lang="ts">
import type { User } from "@/graphql/generated/graphql";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { computed } from "vue";
import { Mail, DollarSign, Plus } from "lucide-vue-next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "vue-router";

const props = defineProps<{
  user: User;
}>();

const fullName = computed(
  () => `${props.user.name} ${props.user.surname || ""}`
);
const router = useRouter();

function goToProducts() {
  router.push("/products");
}
</script>

<template>
  <Card class="shadow-none border-0">
    <CardTitle class="p-6 text-xl">
      Olá {{ fullName }}
    </CardTitle>

    <CardContent>
      <ul class="space-y-4">
        <li class="flex items-start">
          <Mail class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">
              Email
            </div>
            <div class="text-sm text-muted-foreground">
              {{ user.email }}
            </div>
          </div>
        </li>

        <li class="flex items-start">
          <DollarSign class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">
              Créditos Disponíveis
            </div>
            <div class="flex items-center gap-2 mt-1">
              <TooltipProvider>
                <Badge
                  :variant="user.credits > 0 ? 'default' : 'destructive'"
                  :class="{ 'bg-green-500': user.credits > 0 }"
                >
                  {{ user.credits }} créditos
                </Badge>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <button
                      type="button"
                      class="w-6 h-6 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 text-[#ff7300] border border-orange-200 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                      aria-label="Recarregue"
                      @click="goToProducts"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Recarregue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
