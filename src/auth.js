const SESSION_KEY = 'workincome.session'

export function getSessionUser() {
  return sessionStorage.getItem(SESSION_KEY)?.trim() || ''
}

export function loginUser(username) {
  const normalizedUsername = username.trim()
  if (!normalizedUsername) return false

  sessionStorage.setItem(SESSION_KEY, normalizedUsername)
  return true
}

export function logoutUser() {
  sessionStorage.removeItem(SESSION_KEY)
}
