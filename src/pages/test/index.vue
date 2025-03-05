<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="container mx-auto py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Component Test Pages</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Combined Workflow Test Card - Featured Item -->
      <div class="bg-primary/10 border-primary/20 border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer md:col-span-2" @click="navigateTo('/test/combined-workflow')">
        <h2 class="text-xl font-semibold mb-2 flex items-center">
          <span class="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded mr-2">NEW</span>
          Combined Workflow
        </h2>
        <p class="text-muted-foreground mb-4">
          Test the complete file conversion workflow, including the form and results view with
          multiple scenarios showing both successful and failed files together.
        </p>
        <div class="flex items-center text-primary">
          <span>View test page</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="m9 18 6-6-6-6"></path></svg>
        </div>
      </div>
      
      <!-- DownloadFileCards Test Card -->
      <div class="bg-muted rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/test/download-cards')">
        <h2 class="text-xl font-semibold mb-2">Download File Cards</h2>
        <p class="text-muted-foreground mb-4">
          Test the DownloadFileCards component with various configurations of download links.
        </p>
        <div class="flex items-center text-primary">
          <span>View test page</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="m9 18 6-6-6-6"></path></svg>
        </div>
      </div>
      
      <!-- FileErrorsDisplay Test Card -->
      <div class="bg-muted rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo('/test/file-errors')">
        <h2 class="text-xl font-semibold mb-2">File Errors Display</h2>
        <p class="text-muted-foreground mb-4">
          Test the FileErrorsDisplay component with different error scenarios and configurations.
        </p>
        <div class="flex items-center text-primary">
          <span>View test page</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="m9 18 6-6-6-6"></path></svg>
        </div>
      </div>
    </div>
    
    <div class="mt-10 p-6 bg-muted/50 rounded-lg">
      <h2 class="text-xl font-semibold mb-3">About these test pages</h2>
      <p>
        These pages are designed to help you test and evaluate the components created
        for the file conversion feature. Each page provides mock data and controls to
        simulate different scenarios that the components might encounter in real usage.
      </p>
      <p class="mt-3">
        These test pages are only visible in development mode and should not be included
        in the production build.
      </p>
    </div>
  </div>
</template> 