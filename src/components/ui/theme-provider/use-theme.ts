import { computed } from 'vue'
import { useColorMode, BasicColorSchema } from '@vueuse/core'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  // Use VueUse's useColorMode with selector set to document element
  const colorMode = useColorMode({
    selector: 'html',
    attribute: 'class',
    storageKey: 'shadcn-vue-theme',
    modes: {
      auto: '',
      light: 'light',
      dark: 'dark',
    },
  })

  // Create a simpler theme ref for compatibility with existing code
  const theme = computed({
    get: () => colorMode.value === 'auto' ? 'system' : colorMode.value,
    set: (value: Theme) => {
      colorMode.value = value === 'system' ? 'auto' : value as BasicColorSchema
    }
  })

  // Determine if dark mode is active
  const isDarkMode = computed(() => {
    if (colorMode.value === 'dark') return true
    if (colorMode.value === 'auto') return colorMode.system.value === 'dark'
    return false
  })

  // Function to set the theme
  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }
  
  // Toggle between themes
  function toggleTheme() {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }
  
  return {
    theme: computed(() => theme.value),
    currentTheme: theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  }
} 