import { ref, computed, watchEffect } from 'vue'

type Theme = 'light' | 'dark' | 'ai-future' | 'paper' | 'old-west' | 'queer-rock' | 'chaos' | 'harmony'

const THEME_KEY = 'shadcn-vue-theme'

export function useTheme() {
  // Attempt to read from localStorage
  const storageTheme = localStorage.getItem(THEME_KEY) as Theme | null
  
  // Set the initial theme
  const theme = ref<Theme>(storageTheme || 'dark')
  
  // Computed property to determine if we're using dark mode
  const isDarkMode = computed(() => {
    // Only the dark theme is considered dark mode for system purposes
    return theme.value === 'dark' || theme.value === 'queer-rock' || theme.value === 'chaos'
  })
  
  // Computed property for the CSS class
  const themeClass = computed(() => theme.value)
  
  // Watch for changes and update document and localStorage
  watchEffect(() => {
    // Save to localStorage
    localStorage.setItem(THEME_KEY, theme.value)
    
    // Update document class - remove all themes first then add the current one
    document.documentElement.classList.remove('light', 'dark', 'ai-future', 'paper', 'old-west', 'queer-rock', 'chaos', 'harmony')
    document.documentElement.classList.add(theme.value)
  })
  
  // Function to set the theme
  function setTheme(newTheme: Theme) {
    // First remove all theme classes to ensure clean slate
    document.documentElement.classList.remove('light', 'dark', 'ai-future', 'paper', 'old-west', 'queer-rock', 'chaos', 'harmony')
    
    // Force a repaint by accessing offsetHeight (causes a reflow)
    // This helps ensure CSS variables are properly reset
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.documentElement.offsetHeight
    
    // Set the new theme value which will trigger the watchEffect
    theme.value = newTheme
    
    // Add theme class immediately (in addition to the watchEffect)
    document.documentElement.classList.add(newTheme)
  }
  
  // Toggle between themes in order: cycling through all themes
  function toggleTheme() {
    const themes: Theme[] = ['light', 'dark', 'ai-future', 'paper', 'old-west', 'queer-rock', 'chaos', 'harmony']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }
  
  return {
    theme: themeClass,
    currentTheme: theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  }
} 