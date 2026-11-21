import { defaultSettings } from './data/settings.js'

export const SETTINGS_STORAGE_KEY = 'workincome.settings'
export const APP_STORAGE_PREFIX = 'workincome.'

// Combina la configuracion guardada con los valores por defecto, seccion por seccion,
// para que las claves nuevas tengan siempre un valor.
export const readSettings = () => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY) ?? 'null')
    if (!stored || typeof stored !== 'object') return defaultSettings
    return Object.fromEntries(Object.entries(defaultSettings).map(([key, value]) => {
      const saved = stored[key]
      if (Array.isArray(value)) return [key, Array.isArray(saved) ? saved : value]
      return [key, saved && typeof saved === 'object' ? { ...value, ...saved } : value]
    }))
  } catch {
    return defaultSettings
  }
}

export const applyPreferences = (preferences) => {
  document.documentElement.toggleAttribute('data-reduce-motion', Boolean(preferences.reduceMotion))
  document.documentElement.lang = preferences.language
}
