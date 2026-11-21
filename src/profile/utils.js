export const AVATAR_INPUT_ID = 'profile-avatar-input'

export const MAX_AVATAR_BYTES = 1024 * 1024

export const getInitials = (name) => name
  .trim()
  .split(/\s+/)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase() ?? '')
  .join('') || '?'

export const formatMonth = (value) => {
  if (!value) return ''
  const label = new Date(`${value.slice(0, 7)}-01T00:00:00`).toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export const formatPeriod = (start, end) => `${formatMonth(start)} - ${end ? formatMonth(end) : 'Actualidad'}`

export const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

export const normalizeUrl = (value) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const isValidUrl = (value) => {
  try {
    const url = new URL(normalizeUrl(value))
    return url.hostname.includes('.')
  } catch {
    return false
  }
}

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const isValidPhone = (value) => /^\+?[\d\s()-]{7,20}$/.test(value.trim())

// Lista de verificacion para calcular que tan completo esta el perfil.
// action: 'edit' abre el formulario; 'experience' o 'education' abren el modal de esa seccion.
export const getCompleteness = (profile) => {
  const items = [
    { key: 'avatar', label: 'Agrega una foto de perfil', done: Boolean(profile.avatar), action: 'avatar' },
    { key: 'headline', label: 'Escribe un titular profesional', done: profile.headline.trim().length >= 10, action: 'edit' },
    { key: 'about', label: 'Cuentanos sobre ti (minimo 80 caracteres)', done: profile.about.trim().length >= 80, action: 'edit' },
    { key: 'phone', label: 'Agrega un telefono de contacto', done: Boolean(profile.phone.trim()), action: 'edit' },
    { key: 'skills', label: 'Agrega al menos 5 habilidades', done: profile.skills.length >= 5, action: 'edit' },
    { key: 'experience', label: 'Agrega tu experiencia laboral', done: profile.experience.length > 0, action: 'experience' },
    { key: 'education', label: 'Agrega tu formacion academica', done: profile.education.length > 0, action: 'education' },
    { key: 'languages', label: 'Indica los idiomas que hablas', done: profile.languages.length > 0, action: 'edit' },
  ]
  const done = items.filter((item) => item.done).length
  return { items, percent: Math.round((done / items.length) * 100) }
}
