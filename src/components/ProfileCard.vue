<script setup lang="ts">
import type { User } from '@/graphql/generated/graphql';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { computed } from 'vue';
import { Mail, LogIn, Star, DollarSign } from 'lucide-vue-next';

const props = defineProps<{
  user: User;
}>();

const fullName = computed(() => `${props.user.name} ${props.user.surname}`);
</script>

<template>
  <Card>
    <CardTitle class="p-6 text-xl">
      Olá {{ fullName }}
    </CardTitle>

    <CardContent>
      <ul class="space-y-4">
        <li class="flex items-start">
          <Mail class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">Email</div>
            <div class="text-sm text-muted-foreground">{{ user.email }}</div>
          </div>
        </li>

        <li class="flex items-start">
          <LogIn class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">Sign-up Method</div>
            <div class="text-sm text-muted-foreground">{{ user.isSocial ? 'Social' : 'Email' }}</div>
          </div>
        </li>

        <li class="flex items-start">
          <Star class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">Plano</div>
          </div>
        </li>

        <li class="flex items-start">
          <DollarSign class="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <div class="font-medium">Créditos Disponíveis</div>
            <Badge 
              class="mt-1" 
              :variant="user.credits > 0 ? 'default' : 'destructive'"
              :class="{'bg-green-500': user.credits > 0}"
            >
              {{ user.credits }} credits
            </Badge>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
