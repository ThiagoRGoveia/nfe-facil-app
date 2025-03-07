<script setup lang="ts">
import { useTheme } from './use-theme'

defineOptions({
  name: 'TheThemeProvider',
})

const { theme } = useTheme()
</script>

<template>
  <div :class="theme">
    <slot />
  </div>
</template> 