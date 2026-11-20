import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import Modal from '../../components/Modal.jsx'
import Switch from '../../components/Switch.jsx'
import { visibilityOptions } from '../data/settings.js'
import { DangerButton, OptionCards, SettingRow, SettingsCard } from './SettingsUi.jsx'

const privacyToggles = [
  { key: 'searchable', title: 'Aparecer en busquedas de empresas', description: 'Las empresas pueden encontrarte al buscar candidatos.' },
  { key: 'allowMessages', title: 'Recibir mensajes de empresas', description: 'Permite que te contacten antes de que te postules.' },
  { key: 'showPhone', title: 'Mostrar mi telefono', description: 'Visible solo para empresas con las que tienes un proceso activo.' },
  { key: 'showRate', title: 'Mostrar mi tarifa de referencia', description: 'Ayuda a recibir ofertas acordes a tus expectativas.' },
]

function PrivacySettings({ value, onChange, onExport, onClearData }) {
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div className="space-y-6">
      <SettingsCard title="Visibilidad del perfil" description="Decide quien puede ver tu perfil profesional.">
        <OptionCards name="profile-visibility" options={visibilityOptions} value={value.visibility} onChange={(visibility) => onChange({ ...value, visibility })} />
      </SettingsCard>

      <SettingsCard title="Contacto y datos visibles">
        {privacyToggles.map((item) => (
          <SettingRow title={item.title} description={item.description} key={item.key}>
            <Switch checked={value[item.key]} onChange={(checked) => onChange({ ...value, [item.key]: checked })} label={item.title} />
          </SettingRow>
        ))}
      </SettingsCard>

      <SettingsCard title="Tus datos" description="Descarga o borra la informacion guardada en este dispositivo.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-white"><Icon name="download" className="h-4 w-4 text-mint" />Descargar mis datos</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Archivo JSON con tu perfil, progreso en cursos y configuracion.</p>
            </div>
            <button className="btn-secondary w-fit" type="button" onClick={onExport}>Descargar</button>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-5">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-white"><Icon name="trash" className="h-4 w-4 text-rose-300" />Borrar datos de este dispositivo</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Restablece el perfil, los cursos y la configuracion guardados en este navegador.</p>
            </div>
            <button className="btn-secondary w-fit hover:border-rose-400/60 hover:text-rose-300" type="button" onClick={() => setConfirmClear(true)}>Borrar datos</button>
          </div>
        </div>
      </SettingsCard>

      <Modal
        open={confirmClear}
        title="Borrar datos de este dispositivo"
        onClose={() => setConfirmClear(false)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setConfirmClear(false)} autoFocus>Cancelar</button>
          <DangerButton onClick={() => { setConfirmClear(false); onClearData() }}>Borrar y recargar</DangerButton>
        </>}
      >
        <p>Se borraran el perfil, las inscripciones a cursos y la configuracion guardados en este navegador, y la pagina se recargara con los valores iniciales.</p>
      </Modal>
    </div>
  )
}

export default PrivacySettings
