import Icon from '../../components/Icon.jsx'

export function SettingsCard({ title, description, action, children, tone = 'default' }) {
  const border = tone === 'danger' ? 'border-rose-400/30' : 'border-white/10'
  return (
    <section className={`rounded-2xl border bg-panel p-6 md:p-8 ${border}`}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`font-display text-xl font-semibold ${tone === 'danger' ? 'text-rose-300' : 'text-white'}`}>{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        {description && <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function FieldError({ message }) {
  return message ? <span className="mt-1.5 block text-xs font-semibold text-rose-300">{message}</span> : null
}

export function SaveBar({ visible, onDiscard, onSave }) {
  if (!visible) return null
  return (
    <div className="sticky bottom-4 z-20 mt-6 flex flex-col gap-3 rounded-2xl border border-amber-400/40 bg-panel/95 p-4 shadow-2xl shadow-black/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between" role="region" aria-label="Cambios sin guardar">
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-300"><Icon name="alert" />Tienes cambios sin guardar en esta seccion.</p>
      <div className="flex gap-3">
        <button className="btn-secondary flex-1 sm:flex-none" type="button" onClick={onDiscard}>Descartar</button>
        <button className="btn-primary flex-1 sm:flex-none" type="button" onClick={onSave}>Guardar cambios</button>
      </div>
    </div>
  )
}

export function OptionCards({ name, options, value, onChange, columns = 'md:grid-cols-3' }) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${columns}`} role="radiogroup">
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <label className={`cursor-pointer rounded-xl border p-4 transition focus-within:ring-4 focus-within:ring-mint/20 ${isActive ? 'border-mint bg-mint/10' : 'border-white/15 hover:border-white/30'}`} key={option.value}>
            <input className="sr-only" type="radio" name={name} value={option.value} checked={isActive} onChange={() => onChange(option.value)} />
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${isActive ? 'border-mint' : 'border-white/30'}`}>{isActive && <span className="h-1.5 w-1.5 rounded-full bg-mint" />}</span>
              {option.label}
            </span>
            {option.description && <span className="mt-1.5 block text-xs leading-5 text-slate-500">{option.description}</span>}
          </label>
        )
      })}
    </div>
  )
}

export function DangerButton({ children, className = '', ...props }) {
  return (
    <button className={`rounded-xl bg-rose-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-rose-500 ${className}`} type="button" {...props}>
      {children}
    </button>
  )
}
