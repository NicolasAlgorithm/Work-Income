import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter.jsx'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {import.meta.env.MODE === 'login' ? <Login /> : <AppRouter />}
  </StrictMode>,
)
