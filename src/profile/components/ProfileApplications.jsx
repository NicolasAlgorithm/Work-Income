import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { applicationStatuses, applicationSteps } from '../data/profile.js'
import { formatDate } from '../utils.js'

function StatusStepper({ status }) {
  const { step } = applicationStatuses[status]
  if (step < 0) {
    return <p className="text-xs text-slate-500">El proceso finalizo. Sigue postulandote a nuevas oportunidades.</p>
  }

  return (
    <ol className="grid grid-cols-4 gap-2" aria-label={`Etapa actual: ${applicationStatuses[status].label}`}>
      {applicationSteps.map((label, index) => (
        <li key={label}>
          <span className={`block h-1.5 rounded-full ${index <= step ? 'bg-mint' : 'bg-white/10'}`} />
          <span className={`mt-2 block truncate text-[11px] font-semibold ${index === step ? 'text-white' : 'text-slate-500'}`}>{label}</span>
        </li>
      ))}
    </ol>
  )
}

function ProfileApplications({ applications }) {
  const [filter, setFilter] = useState('todas')
  const filters = [
    { value: 'todas', label: 'Todas', count: applications.length },
    { value: 'activas', label: 'Activas', count: applications.filter((item) => applicationStatuses[item.status].step >= 0).length },
    ...Object.entries(applicationStatuses)
      .map(([value, status]) => ({ value, label: status.label, count: applications.filter((item) => item.status === value).length }))
      .filter((item) => item.count > 0),
  ]

  const visible = applications
    .filter((item) => filter === 'todas' || (filter === 'activas' ? applicationStatuses[item.status].step >= 0 : item.status === filter))
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar postulaciones">
        {filters.map((item) => {
          const isActive = filter === item.value
          return (
            <button
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${isActive ? 'border-mint bg-mint text-ink' : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(item.value)}
              key={item.value}
            >
              {item.label} <span className={isActive ? 'text-ink/70' : 'text-slate-500'}>{item.count}</span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <p className="font-semibold text-white">No tienes postulaciones en este estado.</p>
          <a className="btn-primary mt-6" href="#/trabajos">Buscar trabajos</a>
        </div>
      ) : (
        <ul className="space-y-4">
          {visible.map((application) => {
            const status = applicationStatuses[application.status]
            return (
              <li className="rounded-2xl border border-white/10 bg-panel p-5 transition hover:border-white/20" key={application.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-2xl" aria-hidden="true">{application.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-mint">{application.category}</p>
                        <h3 className="font-display text-lg font-semibold leading-tight text-white">{application.jobTitle}</h3>
                        <p className="mt-1 text-sm text-slate-400">{application.company}</p>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${status.className}`}>{status.label}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5"><Icon name="calendar" className="h-3.5 w-3.5" />Postulado el {formatDate(application.appliedAt)}</span>
                      <span className="font-semibold text-amber-400">{application.pay}k COP / hora</span>
                    </div>
                    <div className="mt-4 border-t border-white/10 pt-4"><StatusStepper status={application.status} /></div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-mint/30 bg-gradient-to-r from-mint/10 to-transparent p-5 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-300">Encuentra mas oportunidades que se ajustan a tus habilidades.</p>
        <a className="btn-primary shrink-0" href="#/trabajos"><Icon name="briefcase" />Ver trabajos</a>
      </div>
    </div>
  )
}

export default ProfileApplications
