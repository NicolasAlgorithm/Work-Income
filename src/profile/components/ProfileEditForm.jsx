import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import Modal from '../../components/Modal.jsx'
import { PROFILE_LIMITS, availabilityOptions, languageLevels, modalityOptions } from '../data/profile.js'
import { getInitials, isValidEmail, isValidPhone, isValidUrl, normalizeUrl } from '../utils.js'
import SkillsInput from './SkillsInput.jsx'

const pickEditable = (profile) => ({
  name: profile.name,
  headline: profile.headline,
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  website: profile.website,
  about: profile.about,
  availability: profile.availability,
  modalities: profile.modalities,
  hourlyRate: profile.hourlyRate ? String(profile.hourlyRate) : '',
  skills: profile.skills,
  languages: profile.languages,
})

const validate = (form) => {
  const errors = {}
  if (form.name.trim().length < 3) errors.name = 'Escribe tu nombre completo.'
  if (!form.headline.trim()) errors.headline = 'Agrega un titular que describa tu perfil.'
  if (!isValidEmail(form.email)) errors.email = 'Ingresa un correo electronico valido.'
  if (form.phone.trim() && !isValidPhone(form.phone)) errors.phone = 'Ingresa un telefono valido (solo numeros, espacios y +).'
  if (form.website.trim() && !isValidUrl(form.website)) errors.website = 'Ingresa una direccion web valida.'
  const rate = Number(form.hourlyRate)
  if (form.hourlyRate !== '' && (!Number.isFinite(rate) || rate < 10 || rate > 1000)) errors.hourlyRate = 'La tarifa debe estar entre 10k y 1.000k COP.'
  if (form.modalities.length === 0) errors.modalities = 'Selecciona al menos una modalidad.'
  const names = form.languages.map((language) => language.name.trim().toLowerCase())
  if (names.some((name) => !name)) errors.languages = 'Completa el nombre de cada idioma o elimina la fila.'
  else if (new Set(names).size !== names.length) errors.languages = 'Hay idiomas repetidos.'
  return errors
}

function FormSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

function TextField({ label, error, required, hint, className = '', ...props }) {
  return (
    <label className={`block text-sm font-semibold text-white ${className}`}>
      {label} {required && <span className="text-mint">*</span>}
      <input className={`field mt-2 ${error ? 'border-rose-400/60' : ''}`} aria-invalid={Boolean(error)} {...props} />
      {error ? <span className="mt-1.5 block text-xs font-semibold text-rose-300">{error}</span> : hint && <span className="mt-1.5 block text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  )
}

function ProfileEditForm({ profile, onSave, onCancel }) {
  const [initial] = useState(() => pickEditable(profile))
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const isDirty = JSON.stringify(form) !== JSON.stringify(initial)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }
  const bind = (field) => ({ value: form[field], onChange: (event) => setField(field, event.target.value) })

  const toggleModality = (modality) => setField('modalities', form.modalities.includes(modality)
    ? form.modalities.filter((item) => item !== modality)
    : [...form.modalities, modality])

  const updateLanguage = (index, changes) => setField('languages', form.languages.map((language, i) => (i === index ? { ...language, ...changes } : language)))

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors).find((key) => nextErrors[key])
    if (firstError) {
      document.querySelector(`[data-field="${firstError}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    onSave({
      ...form,
      name: form.name.trim(),
      headline: form.headline.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      website: normalizeUrl(form.website),
      about: form.about.trim(),
      hourlyRate: form.hourlyRate === '' ? null : Number(form.hourlyRate),
      languages: form.languages.map((language) => ({ ...language, name: language.name.trim() })),
    })
  }

  const handleCancel = () => (isDirty ? setConfirmDiscard(true) : onCancel())

  return (
    <>
      <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white" href="#/perfil" onClick={(event) => { if (isDirty) { event.preventDefault(); setConfirmDiscard(true) } }}>
        <Icon name="chevronLeft" />
        Volver al perfil
      </a>
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Tu perfil profesional</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Editar perfil</h1>
        <p className="mt-2 text-sm text-slate-400">Mantener tu informacion actualizada te ayuda a recibir mejores oportunidades.</p>
      </div>

      <form className="grid grid-cols-1 gap-8 pb-20 lg:grid-cols-3 lg:pb-0" onSubmit={handleSubmit} noValidate>
        <div className="space-y-6 lg:col-span-2">
          <FormSection title="Informacion personal" description="Asi te veran las empresas en Work+Income.">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div data-field="name"><TextField label="Nombre completo" required autoComplete="name" maxLength={60} error={errors.name} {...bind('name')} /></div>
              <div data-field="location"><TextField label="Ubicacion" placeholder="Ciudad, pais" autoComplete="address-level2" maxLength={60} {...bind('location')} /></div>
              <div className="md:col-span-2" data-field="headline">
                <TextField label="Titular profesional" required placeholder="Ej. Contadora publica | NIIF y auditoria" maxLength={PROFILE_LIMITS.headline} error={errors.headline} hint={`${form.headline.length}/${PROFILE_LIMITS.headline} caracteres`} {...bind('headline')} />
              </div>
              <label className="block text-sm font-semibold text-white md:col-span-2" data-field="about">
                Sobre mi
                <textarea className="field mt-2 min-h-36 resize-y" placeholder="Cuenta quien eres, en que te especializas y que tipo de trabajo buscas." maxLength={PROFILE_LIMITS.about} {...bind('about')} />
                <span className={`mt-1.5 block text-right text-xs font-normal ${form.about.trim().length < 80 ? 'text-amber-300' : 'text-slate-500'}`}>
                  {form.about.trim().length < 80 ? 'Recomendado: minimo 80 caracteres · ' : ''}{form.about.length}/{PROFILE_LIMITS.about}
                </span>
              </label>
            </div>
          </FormSection>

          <FormSection title="Contacto" description="Solo se comparte con empresas a las que te postules.">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div data-field="email"><TextField label="Correo electronico" required type="email" autoComplete="email" error={errors.email} {...bind('email')} /></div>
              <div data-field="phone"><TextField label="Telefono" type="tel" autoComplete="tel" placeholder="+57 300 000 0000" error={errors.phone} {...bind('phone')} /></div>
              <div className="md:col-span-2" data-field="website"><TextField label="Portafolio o sitio web" type="url" placeholder="tuportafolio.com" error={errors.website} {...bind('website')} /></div>
            </div>
          </FormSection>

          <FormSection title="Habilidades" description="Usamos tus habilidades para recomendarte trabajos y cursos.">
            <SkillsInput skills={form.skills} onChange={(skills) => setField('skills', skills)} max={PROFILE_LIMITS.skills} />
          </FormSection>

          <FormSection title="Idiomas">
            <div className="space-y-3" data-field="languages">
              {form.languages.map((language, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <label className="flex-1">
                    <span className="sr-only">Idioma {index + 1}</span>
                    <input className="field" value={language.name} onChange={(event) => updateLanguage(index, { name: event.target.value })} placeholder="Idioma" maxLength={30} />
                  </label>
                  <label className="w-36 shrink-0 sm:w-44">
                    <span className="sr-only">Nivel de {language.name || `idioma ${index + 1}`}</span>
                    <select className="field" value={language.level} onChange={(event) => updateLanguage(index, { level: event.target.value })}>
                      {languageLevels.map((level) => <option key={level}>{level}</option>)}
                    </select>
                  </label>
                  <button className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300" type="button" onClick={() => setField('languages', form.languages.filter((_, i) => i !== index))} aria-label={`Eliminar ${language.name || 'idioma'}`}>
                    <Icon name="trash" />
                  </button>
                </div>
              ))}
              {errors.languages && <p className="text-xs font-semibold text-rose-300">{errors.languages}</p>}
              {form.languages.length < PROFILE_LIMITS.languages && (
                <button className="btn-secondary" type="button" onClick={() => setField('languages', [...form.languages, { name: '', level: 'Basico' }])}>
                  <Icon name="plus" />Agregar idioma
                </button>
              )}
            </div>
          </FormSection>

          <FormSection title="Preferencias laborales" description="Ayudan a las empresas a saber si encajas con su oferta.">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-white">Disponibilidad</legend>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {availabilityOptions.map((option) => {
                  const isActive = form.availability === option.value
                  return (
                    <label className={`cursor-pointer rounded-xl border p-4 transition ${isActive ? 'border-mint bg-mint/10' : 'border-white/15 hover:border-white/30'}`} key={option.value}>
                      <input className="sr-only" type="radio" name="availability" value={option.value} checked={isActive} onChange={() => setField('availability', option.value)} />
                      <span className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className={`grid h-4 w-4 place-items-center rounded-full border-2 ${isActive ? 'border-mint' : 'border-white/30'}`}>{isActive && <span className="h-1.5 w-1.5 rounded-full bg-mint" />}</span>
                        {option.label}
                      </span>
                      <span className="mt-1.5 block text-xs text-slate-500">{option.description}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <fieldset data-field="modalities">
                <legend className="mb-3 text-sm font-semibold text-white">Modalidad de trabajo</legend>
                <div className="flex flex-wrap gap-2">
                  {modalityOptions.map((modality) => {
                    const isActive = form.modalities.includes(modality)
                    return (
                      <label className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition focus-within:ring-4 focus-within:ring-mint/20 ${isActive ? 'border-mint bg-mint/10 text-mint' : 'border-white/15 text-slate-400 hover:text-white'}`} key={modality}>
                        <input className="sr-only" type="checkbox" checked={isActive} onChange={() => toggleModality(modality)} />
                        {modality}
                      </label>
                    )
                  })}
                </div>
                {errors.modalities && <p className="mt-2 text-xs font-semibold text-rose-300">{errors.modalities}</p>}
              </fieldset>
              <div data-field="hourlyRate">
                <TextField label="Tarifa de referencia (k COP / hora)" type="number" inputMode="numeric" min="10" max="1000" step="5" placeholder="Ej. 70" error={errors.hourlyRate} {...bind('hourlyRate')} />
              </div>
            </div>
          </FormSection>
        </div>

        <aside className="lg:col-span-1">
          <div className="space-y-5 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-white/10 bg-panel p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Vista previa</p>
              <div className="flex items-center gap-4">
                {profile.avatar
                  ? <img className="h-14 w-14 rounded-xl object-cover" src={profile.avatar} alt="" />
                  : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-mint font-display text-xl font-semibold text-ink" aria-hidden="true">{getInitials(form.name)}</span>}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{form.name || 'Tu nombre'}</p>
                  <p className="line-clamp-2 text-xs text-slate-400">{form.headline || 'Tu titular profesional'}</p>
                </div>
              </div>
              {form.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {form.skills.slice(0, 5).map((skill) => <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-semibold text-mint" key={skill}>{skill}</span>)}
                  {form.skills.length > 5 && <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-400">+{form.skills.length - 5}</span>}
                </div>
              )}
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-panel p-6 lg:block">
              {isDirty
                ? <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-amber-300"><span className="h-2 w-2 rounded-full bg-amber-300" />Tienes cambios sin guardar</p>
                : <p className="mb-4 text-xs text-slate-500">No hay cambios pendientes.</p>}
              <button className="btn-primary w-full" type="submit" disabled={!isDirty}>Guardar cambios</button>
              <button className="btn-secondary mt-3 w-full" type="button" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </aside>

        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-white/10 bg-ink/95 px-5 py-4 backdrop-blur lg:hidden">
          <button className="btn-secondary flex-1" type="button" onClick={handleCancel}>Cancelar</button>
          <button className="btn-primary flex-1" type="submit" disabled={!isDirty}>Guardar</button>
        </div>
      </form>

      <Modal
        open={confirmDiscard}
        title="Descartar cambios"
        onClose={() => setConfirmDiscard(false)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setConfirmDiscard(false)} autoFocus>Seguir editando</button>
          <button className="rounded-xl bg-rose-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/20" type="button" onClick={onCancel}>Descartar</button>
        </>}
      >
        <p>Los cambios que hiciste en tu perfil no se guardaran.</p>
      </Modal>
    </>
  )
}

export default ProfileEditForm
