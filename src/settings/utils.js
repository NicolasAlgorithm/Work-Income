import { APP_STORAGE_PREFIX } from './storage.js'

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const strengthLevels = [
  { label: 'Muy debil', className: 'bg-rose-400', text: 'text-rose-300' },
  { label: 'Debil', className: 'bg-rose-400', text: 'text-rose-300' },
  { label: 'Regular', className: 'bg-amber-400', text: 'text-amber-300' },
  { label: 'Buena', className: 'bg-sky-400', text: 'text-sky-300' },
  { label: 'Fuerte', className: 'bg-mint', text: 'text-mint' },
]

export const getPasswordStrength = (password) => {
  const checks = [
    { label: 'Minimo 8 caracteres', passed: password.length >= 8 },
    { label: 'Una letra mayuscula', passed: /[A-Z]/.test(password) },
    { label: 'Un numero', passed: /\d/.test(password) },
    { label: 'Un simbolo', passed: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = password ? checks.filter((check) => check.passed).length : 0
  return { score, checks, ...strengthLevels[score] }
}

export const downloadJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export const clearAppStorage = () => {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(APP_STORAGE_PREFIX))
      .forEach((key) => window.localStorage.removeItem(key))
    return true
  } catch {
    return false
  }
}
