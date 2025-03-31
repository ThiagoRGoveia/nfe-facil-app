<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const forwardedProps: any = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    class="outline-none"
    v-bind="forwardedProps"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
