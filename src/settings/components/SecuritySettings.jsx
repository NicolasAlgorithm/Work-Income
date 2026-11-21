import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import Modal from '../../components/Modal.jsx'
import Switch from '../../components/Switch.jsx'
import { twoFactorMethods } from '../data/settings.js'
import { getPasswordStrength } from '../utils.js'
import { DangerButton, FieldError, OptionCards, SettingRow, SettingsCard } from './SettingsUi.jsx'

const emptyPasswords = { current: '', next: '', confirm: '' }

const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })

function PasswordField({ label, value, onChange, error, autoComplete, visible, onToggle }) {
  return (
    <label className="block text-sm font-semibold text-white">
      {label}
      <span className="relative mt-2 block">
        <input className={`field pr-24 ${error ? 'border-rose-400/60' : ''}`} type={visible ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={Boolean(error)} />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-mint hover:text-white" type="button" onClick={onToggle}>{visible ? 'Ocultar' : 'Mostrar'}</button>
      </span>
      <FieldError message={error} />
    </label>
  )
}

function SecuritySettings({ security, sessions, onUpdate, onRevoke, onNotify }) {
  const [passwords, setPasswords] = useState(emptyPasswords)
  const [showPasswords, setShowPasswords] = useState(false)
  const [errors, setErrors] = useState({})
  const [dialog, setDialog] = useState(null)
  const [method, setMethod] = useState(security.twoFactorMethod)
  const strength = getPasswordStrength(passwords.next)
  const otherSessions = sessions.filter((session) => !session.current)

  const updatePassword = (field) => (event) => {
    setPasswords((current) => ({ ...current, [field]: event.target.value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!passwords.current) nextErrors.current = 'Ingresa tu contrasena actual.'
    if (strength.score < 3) nextErrors.next = 'Usa una contrasena mas segura (al menos 3 de los 4 requisitos, incluido el minimo de 8 caracteres).'
    else if (passwords.next.length < 8) nextErrors.next = 'Debe tener al menos 8 caracteres.'
    else if (passwords.next === passwords.current) nextErrors.next = 'La nueva contrasena debe ser diferente a la actual.'
    if (passwords.confirm !== passwords.next) nextErrors.confirm = 'Las contrasenas no coinciden.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    onUpdate({ passwordUpdatedAt: new Date().toISOString().slice(0, 10) })
    setPasswords(emptyPasswords)
    setShowPasswords(false)
    onNotify('Tu contrasena se actualizo correctamente.')
  }

  const handleTwoFactorToggle = (checked) => {
    if (checked) {
      setMethod(security.twoFactorMethod)
      setDialog('enable-2fa')
    } else {
      setDialog('disable-2fa')
    }
  }

  const confirmEnable = () => {
    onUpdate({ twoFactor: true, twoFactorMethod: method })
    setDialog(null)
    onNotify('Verificacion en dos pasos activada.')
  }

  const confirmDisable = () => {
    onUpdate({ twoFactor: false })
    setDialog(null)
    onNotify('Verificacion en dos pasos desactivada.')
  }

  const revoke = (ids, message) => {
    onRevoke(ids)
    setDialog(null)
    onNotify(message)
  }

  return (
    <div className="space-y-6">
      <SettingsCard title="Cambiar contrasena" description={`Ultima actualizacion: ${formatDate(security.passwordUpdatedAt)}.`}>
        <form className="grid grid-cols-1 gap-6 lg:grid-cols-2" onSubmit={handlePasswordSubmit} noValidate>
          <div className="space-y-5">
            <PasswordField label="Contrasena actual" value={passwords.current} onChange={updatePassword('current')} error={errors.current} autoComplete="current-password" visible={showPasswords} onToggle={() => setShowPasswords((visible) => !visible)} />
            <PasswordField label="Nueva contrasena" value={passwords.next} onChange={updatePassword('next')} error={errors.next} autoComplete="new-password" visible={showPasswords} onToggle={() => setShowPasswords((visible) => !visible)} />
            <PasswordField label="Confirmar nueva contrasena" value={passwords.confirm} onChange={updatePassword('confirm')} error={errors.confirm} autoComplete="new-password" visible={showPasswords} onToggle={() => setShowPasswords((visible) => !visible)} />
            <button className="btn-primary w-full sm:w-auto" type="submit">Actualizar contrasena</button>
          </div>
          <div className="h-fit rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Seguridad de la contrasena</span>
              <span className={passwords.next ? strength.text : 'text-slate-500'}>{passwords.next ? strength.label : 'Sin evaluar'}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4].map((step) => <span className={`h-1.5 rounded-full ${strength.score >= step ? strength.className : 'bg-white/10'}`} key={step} />)}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {strength.checks.map((check) => (
                <li className={`flex items-center gap-2 ${check.passed ? 'text-white' : 'text-slate-500'}`} key={check.label}>
                  <span className={`grid h-4 w-4 place-items-center rounded-full ${check.passed ? 'bg-mint text-ink' : 'border border-white/20'}`}>{check.passed && <Icon name="check" className="h-2.5 w-2.5" />}</span>
                  {check.label}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </SettingsCard>

      <SettingsCard title="Proteccion de la cuenta">
        <SettingRow
          title="Verificacion en dos pasos"
          description={security.twoFactor
            ? `Activa mediante ${twoFactorMethods.find((item) => item.value === security.twoFactorMethod)?.label.toLowerCase()}.`
            : 'Pide un codigo adicional al iniciar sesion desde un dispositivo nuevo.'}
        >
          <Switch checked={security.twoFactor} onChange={handleTwoFactorToggle} label="Verificacion en dos pasos" />
        </SettingRow>
        <SettingRow title="Alertas de inicio de sesion" description="Te avisamos por correo cuando alguien accede desde un dispositivo nuevo.">
          <Switch
            checked={security.loginAlerts}
            onChange={(checked) => { onUpdate({ loginAlerts: checked }); onNotify(checked ? 'Alertas de inicio de sesion activadas.' : 'Alertas de inicio de sesion desactivadas.') }}
            label="Alertas de inicio de sesion"
          />
        </SettingRow>
      </SettingsCard>

      <SettingsCard
        title="Sesiones activas"
        description="Dispositivos donde tu cuenta esta abierta."
        action={otherSessions.length > 0 && <button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => setDialog('revoke-all')}>Cerrar las demas sesiones</button>}
      >
        <ul className="space-y-3">
          {sessions.map((session) => (
            <li className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4" key={session.id}>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${session.current ? 'bg-mint/15 text-mint' : 'bg-white/[0.06] text-slate-400'}`}><Icon name={session.icon} className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">
                  {session.device}
                  {session.current && <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">Este dispositivo</span>}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{session.location} · {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="shrink-0 text-xs font-semibold text-slate-400 hover:text-rose-300" type="button" onClick={() => revoke([session.id], `Cerraste la sesion en ${session.device}.`)}>Cerrar sesion</button>
              )}
            </li>
          ))}
        </ul>
      </SettingsCard>

      <Modal
        open={dialog === 'enable-2fa'}
        title="Activar verificacion en dos pasos"
        onClose={() => setDialog(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setDialog(null)}>Cancelar</button>
          <button className="btn-primary" type="button" onClick={confirmEnable}>Activar</button>
        </>}
      >
        <p className="mb-4">Elige como quieres recibir tus codigos de verificacion:</p>
        <OptionCards name="two-factor-method" options={twoFactorMethods} value={method} onChange={setMethod} columns="" />
      </Modal>

      <Modal
        open={dialog === 'disable-2fa'}
        title="Desactivar verificacion en dos pasos"
        onClose={() => setDialog(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setDialog(null)} autoFocus>Mantener activa</button>
          <DangerButton onClick={confirmDisable}>Desactivar</DangerButton>
        </>}
      >
        <p>Tu cuenta quedara protegida solo con tu contrasena. Te recomendamos mantener esta opcion activa.</p>
      </Modal>

      <Modal
        open={dialog === 'revoke-all'}
        title="Cerrar las demas sesiones"
        onClose={() => setDialog(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setDialog(null)} autoFocus>Cancelar</button>
          <DangerButton onClick={() => revoke(otherSessions.map((session) => session.id), 'Cerraste todas las demas sesiones.')}>Cerrar sesiones</DangerButton>
        </>}
      >
        <p>Se cerrara tu cuenta en {otherSessions.length} {otherSessions.length === 1 ? 'dispositivo' : 'dispositivos'}. Esta sesion seguira activa.</p>
      </Modal>
    </div>
  )
}

export default SecuritySettings
