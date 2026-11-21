import { useCallback, useEffect, useState } from 'react'
import { defaultProfile } from '../data/profile.js'

const STORAGE_KEY = 'workincome.profile'

const readProfile = () => {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    return stored && typeof stored === 'object' ? { ...defaultProfile, ...stored } : defaultProfile
  } catch {
    return defaultProfile
  }
}

const createId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

// Perfil del usuario persistido en localStorage mientras no exista la API de perfiles.
export function useProfile() {
  const [profile, setProfile] = useState(readProfile)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // Sin almacenamiento disponible (modo privado o cuota excedida): el estado sigue en memoria.
    }
  }, [profile])

  const updateProfile = useCallback((changes) => {
    setProfile((current) => ({ ...current, ...changes }))
  }, [])

  // Crea o actualiza una entrada de experiencia o educacion.
  const saveEntry = useCallback((section, entry) => {
    setProfile((current) => {
      const list = current[section]
      const next = entry.id
        ? list.map((item) => (item.id === entry.id ? entry : item))
        : [{ ...entry, id: createId(section) }, ...list]
      return { ...current, [section]: next }
    })
  }, [])

  const removeEntry = useCallback((section, id) => {
    setProfile((current) => ({ ...current, [section]: current[section].filter((item) => item.id !== id) }))
  }, [])

  return { profile, updateProfile, saveEntry, removeEntry }
}
