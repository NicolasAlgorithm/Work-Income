import { useCallback, useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader.jsx'
import Modal from '../components/Modal.jsx'
import Toast from '../components/Toast.jsx'
import { courses } from '../courses/data/courses.js'
import { useCourseProgress } from '../courses/hooks/useCourseProgress.js'
import { getCourseProgress } from '../courses/utils.js'
import EntryModal from './components/EntryModal.jsx'
import ProfileApplications from './components/ProfileApplications.jsx'
import ProfileEditForm from './components/ProfileEditForm.jsx'
import ProfileHeader from './components/ProfileHeader.jsx'
import ProfileLearning from './components/ProfileLearning.jsx'
import ProfileOverview from './components/ProfileOverview.jsx'
import ProfileSidebar from './components/ProfileSidebar.jsx'
import { applicationStatuses, applications } from './data/profile.js'
import { useProfile } from './hooks/useProfile.js'
import { AVATAR_INPUT_ID, MAX_AVATAR_BYTES, getCompleteness } from './utils.js'

const tabs = [
  { value: 'resumen', label: 'Resumen', href: '#/perfil' },
  { value: 'aprendizaje', label: 'Aprendizaje', href: '#/perfil/aprendizaje' },
  { value: 'postulaciones', label: 'Postulaciones', href: '#/perfil/postulaciones' },
]

const entryLabels = { experience: 'experiencia', education: 'formacion' }

function ProfilePage({ view }) {
  const { profile, updateProfile, saveEntry, removeEntry } = useProfile()
  const { enrollments } = useCourseProgress()
  const [toast, setToast] = useState(null)
  const [entryEditor, setEntryEditor] = useState(null)
  const [entryToDelete, setEntryToDelete] = useState(null)

  const notify = useCallback((text, tone = 'success') => setToast({ id: Date.now(), text, tone }), [])
  const closeToast = useCallback(() => setToast(null), [])

  const isEditing = view === 'editar'
  const activeTab = tabs.some((tab) => tab.value === view) ? view : 'resumen'

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [isEditing])

  const completeness = getCompleteness(profile)
  const completedCourses = courses.filter((course) => getCourseProgress(course, enrollments[course.id])?.percent === 100).length
  const activeApplications = applications.filter((item) => applicationStatuses[item.status].step >= 0).length
  const stats = [
    { label: 'Perfil completado', value: `${completeness.percent}%` },
    { label: 'Cursos completados', value: completedCourses },
    { label: 'Postulaciones activas', value: activeApplications },
    { label: 'Habilidades', value: profile.skills.length },
  ]

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      notify('Selecciona una imagen en formato JPG, PNG o WebP.', 'error')
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      notify('La imagen supera 1 MB. Elige una mas liviana.', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ avatar: reader.result })
      notify('Foto de perfil actualizada.')
    }
    reader.onerror = () => notify('No pudimos leer la imagen. Intenta con otra.', 'error')
    reader.readAsDataURL(file)
  }

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/perfil`
    try {
      await navigator.clipboard.writeText(url)
      notify('Enlace del perfil copiado al portapapeles.')
    } catch {
      notify('No pudimos copiar el enlace. Copialo desde la barra de direcciones.', 'error')
    }
  }

  const handleCompletenessAction = (action) => {
    if (action === 'avatar') document.getElementById(AVATAR_INPUT_ID)?.click()
    else if (action === 'edit') window.location.hash = '#/perfil/editar'
    else setEntryEditor({ section: action, entry: null })
  }

  const handleSaveEntry = (section, entry) => {
    saveEntry(section, entry)
    setEntryEditor(null)
    notify(entry.id ? 'Cambios guardados.' : `Agregaste una nueva ${entryLabels[section]}.`)
  }

  const confirmDeleteEntry = () => {
    removeEntry(entryToDelete.section, entryToDelete.entry.id)
    notify(`Eliminaste "${entryToDelete.entry.title}".`)
    setEntryToDelete(null)
  }

  const handleSaveProfile = (changes) => {
    updateProfile(changes)
    window.location.hash = '#/perfil'
    notify('Tu perfil se actualizo correctamente.')
  }

  return (
    <main className="min-h-screen bg-ink font-sans text-slate-300">
      <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">
        <AppHeader active="profile" />

        {isEditing ? (
          <ProfileEditForm profile={profile} onSave={handleSaveProfile} onCancel={() => { window.location.hash = '#/perfil' }} />
        ) : (
          <>
            <ProfileHeader
              profile={profile}
              stats={stats}
              onAvatarSelect={handleAvatarSelect}
              onAvatarRemove={() => { updateProfile({ avatar: null }); notify('Quitaste tu foto de perfil.') }}
              onShare={handleShare}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <nav className="mb-6 flex w-full overflow-x-auto rounded-xl border border-white/10 bg-panel p-1 sm:w-fit" aria-label="Secciones del perfil">
                  {tabs.map((tab) => {
                    const isActive = tab.value === activeTab
                    return (
                      <a
                        className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-center text-sm font-semibold transition sm:flex-none ${isActive ? 'bg-mint text-ink' : 'text-slate-400 hover:text-white'}`}
                        href={tab.href}
                        aria-current={isActive ? 'page' : undefined}
                        key={tab.value}
                      >
                        {tab.label}
                        {tab.value === 'postulaciones' && <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] ${isActive ? 'bg-ink/20' : 'bg-white/10'}`}>{applications.length}</span>}
                      </a>
                    )
                  })}
                </nav>

                {activeTab === 'resumen' && (
                  <ProfileOverview
                    profile={profile}
                    onAddEntry={(section) => setEntryEditor({ section, entry: null })}
                    onEditEntry={(section, entry) => setEntryEditor({ section, entry })}
                    onDeleteEntry={(section, entry) => setEntryToDelete({ section, entry })}
                  />
                )}
                {activeTab === 'aprendizaje' && <ProfileLearning enrollments={enrollments} skills={profile.skills} />}
                {activeTab === 'postulaciones' && <ProfileApplications applications={applications} />}
              </div>

              <aside className="lg:col-span-1">
                <ProfileSidebar profile={profile} completeness={completeness} onCompletenessAction={handleCompletenessAction} />
              </aside>
            </div>
          </>
        )}
      </div>

      {entryEditor && (
        <EntryModal
          section={entryEditor.section}
          entry={entryEditor.entry}
          onClose={() => setEntryEditor(null)}
          onSave={handleSaveEntry}
          key={entryEditor.entry?.id ?? `new-${entryEditor.section}`}
        />
      )}

      <Modal
        open={Boolean(entryToDelete)}
        title={`Eliminar ${entryToDelete ? entryLabels[entryToDelete.section] : ''}`}
        onClose={() => setEntryToDelete(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setEntryToDelete(null)} autoFocus>Cancelar</button>
          <button className="rounded-xl bg-rose-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/20" type="button" onClick={confirmDeleteEntry}>Eliminar</button>
        </>}
      >
        <p>Se eliminara <span className="font-semibold text-white">{entryToDelete?.entry.title}</span> de tu perfil. Esta accion no se puede deshacer.</p>
      </Modal>

      <Toast message={toast} onClose={closeToast} key={toast?.id} />
    </main>
  )
}

export default ProfilePage
