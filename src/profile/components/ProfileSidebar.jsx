import Icon from '../../components/Icon.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { availabilityOptions } from '../data/profile.js'

function SidebarCard({ title, action, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  )
}

const editLink = <a className="text-xs font-semibold text-mint hover:text-white" href="#/perfil/editar">Editar</a>

function ProfileSidebar({ profile, completeness, onCompletenessAction }) {
  const availability = availabilityOptions.find((option) => option.value === profile.availability) ?? availabilityOptions[0]
  const pending = completeness.items.filter((item) => !item.done)

  const contactItems = [
    { icon: 'mail', label: 'Correo', value: profile.email, href: profile.email ? `mailto:${profile.email}` : undefined },
    { icon: 'phone', label: 'Telefono', value: profile.phone },
    { icon: 'mapPin', label: 'Ubicacion', value: profile.location },
    { icon: 'globe', label: 'Sitio web', value: profile.website?.replace(/^https?:\/\//, ''), href: profile.website || undefined },
  ]

  return (
    <div className="space-y-5 lg:sticky lg:top-6">
      <SidebarCard title="Completa tu perfil">
        <div className="mb-2 flex items-end justify-between">
          <p className="text-xs text-slate-500">{pending.length ? 'Un perfil completo recibe mas propuestas.' : 'Tu perfil esta completo.'}</p>
          <span className="font-display text-2xl font-semibold text-mint">{completeness.percent}%</span>
        </div>
        <ProgressBar value={completeness.percent} label="Perfil completado" className="h-2.5" />
        <ul className="mt-5 space-y-2">
          {completeness.items.map((item) => (
            <li key={item.key}>
              {item.done ? (
                <span className="flex items-center gap-3 px-1 py-1.5 text-sm text-slate-500">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-ink"><Icon name="check" className="h-3 w-3" /></span>
                  <span className="line-through decoration-white/20">{item.label}</span>
                </span>
              ) : (
                <button className="group flex w-full items-center gap-3 rounded-lg px-1 py-1.5 text-left text-sm font-semibold text-white transition hover:text-mint" type="button" onClick={() => onCompletenessAction(item.action)}>
                  <span className="h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-white/25 group-hover:border-mint" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-mint transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </SidebarCard>

      <SidebarCard title="Preferencias laborales" action={editLink}>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Disponibilidad</dt>
            <dd className="mt-1.5"><span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${availability.className}`}>{availability.label}</span></dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tarifa de referencia</dt>
            <dd className="mt-1 font-semibold text-amber-400">{profile.hourlyRate ? `${profile.hourlyRate}k COP / hora` : 'Sin definir'}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Modalidad</dt>
            <dd className="mt-1.5 flex flex-wrap gap-2">
              {profile.modalities.length
                ? profile.modalities.map((modality) => <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300" key={modality}>{modality}</span>)
                : <span className="text-slate-500">Sin definir</span>}
            </dd>
          </div>
        </dl>
      </SidebarCard>

      <SidebarCard title="Contacto" action={editLink}>
        <ul className="space-y-3 text-sm">
          {contactItems.map((item) => (
            <li className="flex items-center gap-3" key={item.label}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-mint"><Icon name={item.icon} /></span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">{item.label}</span>
                {item.value
                  ? (item.href
                    ? <a className="block truncate font-semibold text-white hover:text-mint" href={item.href} target={item.icon === 'globe' ? '_blank' : undefined} rel="noreferrer">{item.value}</a>
                    : <span className="block truncate font-semibold text-white">{item.value}</span>)
                  : <span className="block text-slate-500">No agregado</span>}
              </span>
            </li>
          ))}
        </ul>
      </SidebarCard>
    </div>
  )
}

export default ProfileSidebar
