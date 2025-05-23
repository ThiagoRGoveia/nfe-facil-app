<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { ComputedRef } from 'vue'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps: Omit<AccordionItemProps, 'class'> = reactiveOmit(props, 'class')

const forwardedProps: ComputedRef<AccordionItemProps> = useForwardProps(delegatedProps) as ComputedRef<AccordionItemProps>
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>
