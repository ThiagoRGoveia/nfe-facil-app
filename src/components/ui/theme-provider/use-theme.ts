import { ref, computed, watchEffect, nextTick } from 'vue'

type Theme = 'light' | 'dark' 

const THEME_KEY = 'shadcn-vue-theme'

export function useTheme() {
  // Attempt to read from localStorage
  const storageTheme = localStorage.getItem(THEME_KEY) as Theme | null
  
  // Set the initial theme
  const theme = ref<Theme>(storageTheme || 'dark')
  
  // Computed property to determine if we're using dark mode
  const isDarkMode = computed(() => {
    // Only the dark theme is considered dark mode for system purposes
    return theme.value === 'dark'
  })
  
  // Computed property for the CSS class
  const themeClass = computed(() => theme.value)
  
  // Watch for changes and update document and localStorage
  watchEffect(() => {
    // Save to localStorage
    localStorage.setItem(THEME_KEY, theme.value)
    
    // Update document class - remove all themes first then add the current one
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme.value)
  })
  
  // Function to set the theme
  function setTheme(newTheme: Theme) {
    // Set the new theme value first
    theme.value = newTheme
    
    // Use nextTick to ensure DOM updates are complete
    nextTick(() => {
      // Apply theme at document level and make sure it propagates
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(newTheme)
      
      // Force style recalculation on the entire document
      // This is more thorough than just accessing offsetHeight
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(':root { --theme-refresh: 1; }')
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
      
      // Remove the temporary stylesheet after a short delay
      setTimeout(() => {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== sheet)
      }, 0)
    })
  }
  
  // Toggle between themes in order: cycling through all themes
  function toggleTheme() {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }
  
  return {
    theme: themeClass,
    currentTheme: theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  }
} 