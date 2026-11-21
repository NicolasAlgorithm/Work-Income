import { useCallback, useEffect, useState } from 'react'
import { SETTINGS_STORAGE_KEY, applyPreferences, readSettings } from '../storage.js'

// Configuracion de la cuenta persistida en localStorage mientras no exista la API.
export function useSettings() {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Sin almacenamiento disponible: el estado sigue en memoria.
    }
    applyPreferences(settings.preferences)
  }, [settings])

  const saveSection = useCallback((section, values) => {
    setSettings((current) => ({ ...current, [section]: { ...current[section], ...values } }))
  }, [])

  const revokeSessions = useCallback((ids) => {
    setSettings((current) => ({ ...current, sessions: current.sessions.filter((session) => !ids.includes(session.id)) }))
  }, [])

  return { settings, saveSection, revokeSessions }
}
