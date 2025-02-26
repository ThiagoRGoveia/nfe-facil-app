<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-vue-next";

const auth = useAuthStore();
const isEditing = ref(false);
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">
        Perfil
      </h1>
    </div>

    <div
      v-if="auth.isLoading"
      class="flex justify-center items-center py-8"
    >
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
    </div>

    <div v-else-if="auth.user" class="grid gap-6">
      <div>
        <ProfileCard
          :user="auth.user"
          :is-editing="isEditing"
          @toggle-edit="isEditing = !isEditing"
        />
      </div>

      <div v-if="!auth.user.isSocial">
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <ResetPassword />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
          </CardHeader>
          <CardContent>
            <ApiCredentials :user="auth.user" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
