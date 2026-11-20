import { useCallback, useEffect, useRef, useState } from 'react'
import AppHeader from '../components/AppHeader.jsx'
import Icon from '../components/Icon.jsx'
import Toast from '../components/Toast.jsx'
import { useCourseProgress } from '../courses/hooks/useCourseProgress.js'
import { useProfile } from '../profile/hooks/useProfile.js'
import { isValidEmail } from '../profile/utils.js'
import AccountSettings from './components/AccountSettings.jsx'
import NotificationSettings from './components/NotificationSettings.jsx'
import PreferenceSettings from './components/PreferenceSettings.jsx'
import PrivacySettings from './components/PrivacySettings.jsx'
import SecuritySettings from './components/SecuritySettings.jsx'
import { SaveBar } from './components/SettingsUi.jsx'
import { settingsSections } from './data/settings.js'
import { useSettings } from './hooks/useSettings.js'
import { clearAppStorage, downloadJson, isEqual } from './utils.js'

const validators = {
  cuenta: (values) => ({
    email: isValidEmail(values.email) ? undefined : 'Ingresa un correo electronico valido.',
    username: /^[a-z0-9._]{3,30}$/.test(values.username) ? undefined : 'Usa de 3 a 30 caracteres: letras minusculas, numeros, puntos o guiones bajos.',
  }),
}

function SettingsPage({ section }) {
  const { settings, saveSection, revokeSessions } = useSettings()
  const { profile, updateProfile } = useProfile()
  const { enrollments } = useCourseProgress()
  const [drafts, setDrafts] = useState({})
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const navRef = useRef(null)

  const notify = useCallback((text, tone = 'success') => setToast({ id: Date.now(), text, tone }), [])
  const closeToast = useCallback(() => setToast(null), [])

  const active = settingsSections.find((item) => item.id === section) ?? settingsSections[0]

  useEffect(() => {
    window.scrollTo({ top: 0 })
    // En pantallas pequenas el menu se desplaza en horizontal: centra la seccion activa.
    const nav = navRef.current
    const activeLink = nav?.querySelector('[aria-current="page"]')
    if (nav && activeLink && nav.scrollWidth > nav.clientWidth) {
      nav.scrollLeft = activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2
    }
  }, [active.id])

  // Valor guardado de cada seccion editable; el correo vive en el perfil del usuario.
  const savedValues = {
    cuenta: { email: profile.email, username: settings.account.username },
    notificaciones: settings.notifications,
    privacidad: settings.privacy,
    preferencias: settings.preferences,
  }

  const valueOf = (id) => drafts[id] ?? savedValues[id]
  const isDirty = (id) => Boolean(drafts[id]) && !isEqual(drafts[id], savedValues[id])

  const changeDraft = (id) => (values) => {
    setDrafts((current) => ({ ...current, [id]: values }))
    if (errors[id]) setErrors((current) => ({ ...current, [id]: undefined }))
  }

  const discard = (id) => {
    setDrafts((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
    setErrors((current) => ({ ...current, [id]: undefined }))
  }

  const save = (id) => {
    const values = valueOf(id)
    const sectionErrors = validators[id]?.(values) ?? {}
    if (Object.values(sectionErrors).some(Boolean)) {
      setErrors((current) => ({ ...current, [id]: sectionErrors }))
      notify('Revisa los campos marcados antes de guardar.', 'error')
      return
    }

    if (id === 'cuenta') {
      updateProfile({ email: values.email.trim() })
      saveSection('account', { username: values.username })
    } else {
      const key = { notificaciones: 'notifications', privacidad: 'privacy', preferencias: 'preferences' }[id]
      saveSection(key, values)
    }
    discard(id)
    notify('Cambios guardados correctamente.')
  }

  const exportData = () => {
    downloadJson({ exportedAt: new Date().toISOString(), profile, courses: enrollments, settings }, 'workincome-mis-datos.json')
    notify('Descargamos un archivo con tus datos.')
  }

  const clearData = () => {
    if (!clearAppStorage()) {
      notify('No pudimos borrar los datos de este navegador.', 'error')
      return
    }
    window.location.hash = '#/trabajos'
    window.location.reload()
  }

  const renderSection = () => {
    switch (active.id) {
      case 'seguridad':
        return <SecuritySettings security={settings.security} sessions={settings.sessions} onUpdate={(values) => saveSection('security', values)} onRevoke={revokeSessions} onNotify={notify} />
      case 'notificaciones':
        return <NotificationSettings value={valueOf('notificaciones')} onChange={changeDraft('notificaciones')} />
      case 'privacidad':
        return <PrivacySettings value={valueOf('privacidad')} onChange={changeDraft('privacidad')} onExport={exportData} onClearData={clearData} />
      case 'preferencias':
        return <PreferenceSettings value={valueOf('preferencias')} onChange={changeDraft('preferencias')} />
      default:
        return <AccountSettings value={valueOf('cuenta')} errors={errors.cuenta ?? {}} onChange={changeDraft('cuenta')} onNotify={notify} />
    }
  }

  return (
    <main className="min-h-screen bg-ink font-sans text-slate-300">
      <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">
        <AppHeader active="settings" />

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Tu cuenta</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Configuracion</h1>
          <p className="mt-2 text-sm text-slate-400">Administra tu cuenta, tu seguridad y la forma en que usas Work+Income.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <nav className="relative -mx-5 overflow-x-auto px-5 lg:sticky lg:top-6 lg:mx-0 lg:overflow-visible lg:px-0" aria-label="Secciones de configuracion" ref={navRef}>
              <ul className="flex gap-2 lg:flex-col lg:gap-1 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-panel lg:p-3">
                {settingsSections.map((item) => {
                  const isActive = item.id === active.id
                  return (
                    <li className="shrink-0" key={item.id}>
                      <a
                        className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition lg:py-3 ${isActive ? 'bg-mint text-ink' : 'border border-white/10 bg-panel text-slate-400 hover:text-white lg:border-transparent lg:bg-transparent lg:hover:bg-white/[0.04]'}`}
                        href={`#/configuracion/${item.id}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon name={item.icon} />
                        <span className="flex-1">{item.label}</span>
                        {isDirty(item.id) && <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-ink' : 'bg-amber-300'}`} title="Cambios sin guardar" aria-label="Cambios sin guardar" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <section className="lg:col-span-3" aria-labelledby="settings-section-title">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-white" id="settings-section-title">{active.label}</h2>
              <p className="mt-1 text-sm text-slate-500">{active.description}</p>
            </div>
            {renderSection()}
            <SaveBar visible={isDirty(active.id)} onDiscard={() => discard(active.id)} onSave={() => save(active.id)} />
          </section>
        </div>
      </div>
      <Toast message={toast} onClose={closeToast} key={toast?.id} />
    </main>
  )
}

export default SettingsPage
