import { useTheme } from 'next-themes'

export function useDarkModeDetector() {
  const { theme } = useTheme()

  return theme === 'dark'
}
