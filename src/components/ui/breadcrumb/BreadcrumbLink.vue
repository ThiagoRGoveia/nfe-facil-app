<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'

// eslint-disable-next-line vue/require-default-prop
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'a',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('cursor-pointer text-muted-foreground relative breadcrumb-link', props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
.breadcrumb-link {
  position: relative;
}

.breadcrumb-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -1px;
  left: 0;
  background-color: currentColor;
  transition: width 0.2s ease-in-out;
}

.breadcrumb-link:hover::after {
  width: 100%;
}

.breadcrumb-link:hover {
  color: hsl(var(--foreground));
}
</style>
