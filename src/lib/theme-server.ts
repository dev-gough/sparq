import { cookies } from 'next/headers'

export function getServerTheme(): 'light' | 'dark' {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme-preference')?.value
  
  if (theme === 'dark') return 'dark'
  if (theme === 'light') return 'light'
  
  // Default to light mode if no preference is set
  return 'light'
}