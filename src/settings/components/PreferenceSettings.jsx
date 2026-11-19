import Switch from '../../components/Switch.jsx'
import { languageOptions, startPageOptions, timezoneOptions } from '../data/settings.js'
import { SettingRow, SettingsCard } from './SettingsUi.jsx'

function SelectField({ label, hint, value, options, onChange }) {
  return (
    <label className="block text-sm font-semibold text-white">
      {label}
      <select className="field mt-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option value={option.value} disabled={option.disabled} key={option.value}>{option.label}</option>)}
      </select>
      {hint && <span className="mt-1.5 block text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  )
}

function PreferenceSettings({ value, onChange }) {
  const update = (field) => (fieldValue) => onChange({ ...value, [field]: fieldValue })
  const localTime = new Date().toLocaleTimeString('es-CO', { timeZone: value.timezone, hour: '2-digit', minute: '2-digit' })

  return (
    <div className="space-y-6">
      <SettingsCard title="Region e idioma">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectField label="Idioma de la interfaz" value={value.language} options={languageOptions} onChange={update('language')} hint="Mas idiomas estaran disponibles pronto." />
          <SelectField label="Zona horaria" value={value.timezone} options={timezoneOptions} onChange={update('timezone')} hint={`Hora local: ${localTime}. Se usa para entrevistas y recordatorios.`} />
        </div>
      </SettingsCard>

      <SettingsCard title="Experiencia de uso">
        <div className="mb-6 max-w-sm">
          <SelectField label="Pagina de inicio" value={value.startPage} options={startPageOptions} onChange={update('startPage')} hint="Seccion que se abre al entrar a Work+Income." />
        </div>
        <SettingRow title="Reducir animaciones" description="Desactiva transiciones y efectos de movimiento en toda la aplicacion.">
          <Switch checked={value.reduceMotion} onChange={update('reduceMotion')} label="Reducir animaciones" />
        </SettingRow>
      </SettingsCard>
    </div>
  )
}

export default PreferenceSettings
