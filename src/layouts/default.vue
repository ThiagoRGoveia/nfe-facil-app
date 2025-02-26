<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-1">
      <div class="container mx-auto py-8">
        <div class="max-w-6xl mx-auto">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
//
</script>
