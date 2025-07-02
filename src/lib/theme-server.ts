import { cookies } from 'next/headers'

export async function getServerTheme(): Promise<'light' | 'dark'> {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme-preference')?.value
  
  if (theme === 'dark') return 'dark'
  if (theme === 'light') return 'light'
  
  // Default to light mode if no preference is set
  return 'light'
}