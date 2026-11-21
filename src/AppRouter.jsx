import { useEffect } from 'react'
import App from './App.jsx'
import CoursesPage from './courses/CoursesPage.jsx'
import { useHashRoute } from './hooks/useHashRoute.js'
import ProfilePage from './profile/ProfilePage.jsx'
import SettingsPage from './settings/SettingsPage.jsx'
import { applyPreferences, readSettings } from './settings/storage.js'

const defaultSections = { courses: 'cursos', profile: 'perfil', settings: 'configuracion' }

function AppRouter() {
  const { preferences } = readSettings()
  const [section = defaultSections[import.meta.env.MODE] ?? preferences.startPage, param] = useHashRoute()

  useEffect(() => {
    applyPreferences(readSettings().preferences)
  }, [])

  if (section === 'cursos') return <CoursesPage courseId={param} />
  if (section === 'perfil') return <ProfilePage view={param} />
  if (section === 'configuracion') return <SettingsPage section={param} />
  return <App />
}

export default AppRouter
