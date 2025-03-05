export type Theme = 'light'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme?: Theme | null
}

export function themeIsValid(string: null | string): string is Theme {
  return string ? ['light'].includes(string) : false
}

export const themeLocalStorageKey = 'payload-theme'
