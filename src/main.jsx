import { StrictMode } from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter.jsx'
import Login from './Login.jsx'
import { getSessionUser, loginUser } from './auth.js'

export function Root() {
  const [authenticated, setAuthenticated] = useState(() => Boolean(getSessionUser()))

  function handleLogin(username) {
    if (loginUser(username)) {
      window.location.hash = '/trabajos'
      setAuthenticated(true)
    }
  }

  return authenticated ? <AppRouter /> : <Login onLogin={handleLogin} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
