import { useState } from 'react'
import Modal from '../../components/Modal.jsx'
import { DangerButton, FieldError, SettingsCard } from './SettingsUi.jsx'

const DELETE_CONFIRMATION = 'ELIMINAR'

function AccountSettings({ value, errors, onChange, onNotify }) {
  const [dialog, setDialog] = useState(null)
  const [confirmation, setConfirmation] = useState('')

  const closeDialog = () => {
    setDialog(null)
    setConfirmation('')
  }

  const confirmDeactivate = () => {
    closeDialog()
    onNotify('Recibimos tu solicitud. Te enviaremos un correo para confirmar la desactivacion.')
  }

  const confirmDelete = () => {
    closeDialog()
    onNotify('Recibimos tu solicitud de eliminacion. Te enviaremos un correo para confirmarla.')
  }

  return (
    <div className="space-y-6">
      <SettingsCard title="Datos de acceso" description="Los usas para iniciar sesion y recibir notificaciones importantes.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block text-sm font-semibold text-white">
            Correo electronico <span className="text-mint">*</span>
            <input className={`field mt-2 ${errors.email ? 'border-rose-400/60' : ''}`} type="email" autoComplete="email" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} aria-invalid={Boolean(errors.email)} />
            <FieldError message={errors.email} />
            {!errors.email && <span className="mt-1.5 block text-xs font-normal text-slate-500">Tambien se actualiza en tu perfil.</span>}
          </label>
          <label className="block text-sm font-semibold text-white">
            Nombre de usuario <span className="text-mint">*</span>
            <span className="relative mt-2 block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">@</span>
              <input className={`field pl-8 ${errors.username ? 'border-rose-400/60' : ''}`} autoComplete="username" value={value.username} onChange={(event) => onChange({ ...value, username: event.target.value.toLowerCase() })} maxLength={30} aria-invalid={Boolean(errors.username)} />
            </span>
            <FieldError message={errors.username} />
            {!errors.username && <span className="mt-1.5 block text-xs font-normal text-slate-500">Letras minusculas, numeros, puntos y guiones bajos.</span>}
          </label>
        </div>
      </SettingsCard>

      <SettingsCard title="Zona de riesgo" description="Estas acciones afectan el acceso a tu cuenta." tone="danger">
        <div className="divide-y divide-white/10">
          <div className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Desactivar cuenta</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">Oculta tu perfil y pausa las notificaciones. Puedes volver cuando quieras.</p>
            </div>
            <button className="btn-secondary shrink-0 hover:border-rose-400/60 hover:text-rose-300" type="button" onClick={() => setDialog('deactivate')}>Desactivar</button>
          </div>
          <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Eliminar cuenta</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">Borra de forma permanente tu perfil, postulaciones y progreso en cursos.</p>
            </div>
            <DangerButton className="shrink-0" onClick={() => setDialog('delete')}>Eliminar cuenta</DangerButton>
          </div>
        </div>
      </SettingsCard>

      <Modal
        open={dialog === 'deactivate'}
        title="Desactivar cuenta"
        onClose={closeDialog}
        actions={<>
          <button className="btn-secondary" type="button" onClick={closeDialog} autoFocus>Cancelar</button>
          <DangerButton onClick={confirmDeactivate}>Desactivar</DangerButton>
        </>}
      >
        <p>Tu perfil dejara de ser visible para las empresas y no recibiras notificaciones. Tus datos se conservan y puedes reactivar la cuenta iniciando sesion.</p>
      </Modal>

      <Modal
        open={dialog === 'delete'}
        title="Eliminar cuenta"
        onClose={closeDialog}
        actions={<>
          <button className="btn-secondary" type="button" onClick={closeDialog}>Cancelar</button>
          <DangerButton onClick={confirmDelete} disabled={confirmation !== DELETE_CONFIRMATION}>Eliminar definitivamente</DangerButton>
        </>}
      >
        <p>Esta accion es permanente: se borraran tu perfil, tus postulaciones y tu progreso en cursos.</p>
        <label className="mt-4 block text-sm font-semibold text-white">
          Escribe <span className="font-mono text-rose-300">{DELETE_CONFIRMATION}</span> para confirmar
          <input className="field mt-2" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" autoFocus />
        </label>
      </Modal>
    </div>
  )
}

export default AccountSettings
