<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('font-normal text-foreground relative after:content-[\'\'] after:absolute after:w-full after:h-[1px] after:bottom-[-1px] after:left-0 after:bg-current', props.class)"
  >
    <slot />
  </span>
</template>
