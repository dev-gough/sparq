export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return cookieValue || null
  }
  return null
}

export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function getThemeFromCookie(): boolean | null {
  const theme = getCookie('theme-preference')
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return null
}

export function setThemeCookie(isDark: boolean): void {
  setCookie('theme-preference', isDark ? 'dark' : 'light', 365)
}