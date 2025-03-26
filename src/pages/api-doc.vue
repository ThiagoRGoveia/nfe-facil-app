<script setup lang="ts">
import { onMounted } from 'vue';

// Redirect to the API doc URL directly
onMounted(() => {
  window.location.href = import.meta.env.VITE_API_DOC_URL;
});
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <p>Redirecting to API documentation...</p>
  </div>
</template> 