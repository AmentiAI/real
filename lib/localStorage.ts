// LocalStorage persistence for admin panel demo mode

export const StorageKeys = {
  PAGES: 'amenti_pages',
  CONTENT: 'amenti_content',
  BRANDING: 'amenti_branding',
  SETTINGS: 'amenti_settings'
} as const

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return defaultValue
    }
  }
  return defaultValue
}

export function clearStorage(key: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

export function clearAllStorage(): void {
  if (typeof window !== 'undefined') {
    try {
      Object.values(StorageKeys).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Error clearing all localStorage:', error)
    }
  }
}









