<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <nav 
    aria-label="breadcrumb" 
    :class="cn('breadcrumb-container', props.class)"
  >
    <slot />
  </nav>
</template>

<style>
.breadcrumb-container {
  --breadcrumb-divider-color: hsl(var(--muted-foreground));
  --breadcrumb-color: hsl(var(--muted-foreground));
  --breadcrumb-active-color: hsl(var(--foreground));
}
</style>
