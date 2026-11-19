import Icon from '../../components/Icon.jsx'
import Switch from '../../components/Switch.jsx'
import { alertFrequencies, notificationCategories, notificationChannels } from '../data/settings.js'
import { SettingsCard } from './SettingsUi.jsx'

const setAll = (matrix, enabled) => Object.fromEntries(Object.entries(matrix).map(([category, channels]) => [
  category,
  Object.fromEntries(Object.keys(channels).map((channel) => [channel, enabled])),
]))

function NotificationSettings({ value, onChange }) {
  const toggle = (category, channel, enabled) => onChange({
    ...value,
    matrix: { ...value.matrix, [category]: { ...value.matrix[category], [channel]: enabled } },
  })

  const enabledCount = Object.values(value.matrix).flatMap((channels) => Object.values(channels)).filter(Boolean).length

  return (
    <div className="space-y-6">
      <SettingsCard
        title="Canales de notificacion"
        description={`${enabledCount} avisos activos. Elige que quieres recibir en cada canal.`}
        action={(
          <div className="flex gap-2">
            <button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => onChange({ ...value, matrix: setAll(value.matrix, true) })}>Activar todo</button>
            <button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => onChange({ ...value, matrix: setAll(value.matrix, false) })}>Silenciar todo</button>
          </div>
        )}
      >
        <div className="hidden grid-cols-[1fr_repeat(3,5.5rem)] items-center gap-4 border-b border-white/10 pb-3 md:grid">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tipo de aviso</span>
          {notificationChannels.map((channel) => (
            <span className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500" key={channel.id}><Icon name={channel.icon} className="h-3.5 w-3.5" />{channel.label}</span>
          ))}
        </div>
        <ul className="divide-y divide-white/10">
          {notificationCategories.map((category) => (
            <li className="grid grid-cols-1 gap-4 py-4 md:grid-cols-[1fr_repeat(3,5.5rem)] md:items-center" key={category.id}>
              <div>
                <p className="text-sm font-semibold text-white">{category.label}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{category.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 md:contents">
                {notificationChannels.map((channel) => (
                  <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] py-2 md:bg-transparent md:py-0" key={channel.id}>
                    <span className="text-[11px] font-semibold text-slate-500 md:hidden">{channel.label}</span>
                    <Switch checked={value.matrix[category.id][channel.id]} onChange={(enabled) => toggle(category.id, channel.id, enabled)} label={`${category.label} por ${channel.label}`} />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </SettingsCard>

      <SettingsCard title="Frecuencia de alertas de empleo" description="Con que frecuencia te enviamos las ofertas recomendadas por correo.">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Frecuencia de alertas">
          {alertFrequencies.map((option) => {
            const isActive = value.alertFrequency === option.value
            return (
              <label className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition focus-within:ring-4 focus-within:ring-mint/20 ${isActive ? 'border-mint bg-mint/10 text-mint' : 'border-white/15 text-slate-400 hover:text-white'}`} key={option.value}>
                <input className="sr-only" type="radio" name="alert-frequency" value={option.value} checked={isActive} onChange={() => onChange({ ...value, alertFrequency: option.value })} />
                {option.label}
              </label>
            )
          })}
        </div>
      </SettingsCard>
    </div>
  )
}

export default NotificationSettings
