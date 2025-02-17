<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";
import { useCookie } from "#imports";
import auth from "~/middleware/auth";

const { user, isAuthenticated } = useAuth0();
const userCookie = useCookie("user-session");

onMounted(() => {
  if (isAuthenticated.value && user.value) {
    userCookie.value = JSON.stringify({
      email: user.value.email,
      name: user.value.name,
      picture: user.value.picture,
      sub: user.value.sub,
    });
  }
});

definePageMeta({
  middleware: auth,
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section>
        <h2 class="text-2xl font-semibold mb-6">Convert Files</h2>
        <ConversionForm title="Solte seus arquvos aqui" />
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-6">Recent Files</h2>
        <FilesTable />
      </section>
    </div>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-6">Conversion History</h2>
      <HistoryTable />
    </section>
  </div>
</template>
