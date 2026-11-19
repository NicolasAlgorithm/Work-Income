import { useId, useState } from 'react'
import Modal from '../../components/Modal.jsx'

const sectionCopy = {
  experience: { noun: 'experiencia', title: 'Cargo', titlePlaceholder: 'Ej. Desarrolladora web', organization: 'Empresa o cliente', organizationPlaceholder: 'Ej. Agencia Pixel Andino', current: 'Trabajo aqui actualmente' },
  education: { noun: 'formacion', title: 'Titulo o programa', titlePlaceholder: 'Ej. Tecnologia en Desarrollo de Software', organization: 'Institucion', organizationPlaceholder: 'Ej. SENA', current: 'Estudio aqui actualmente' },
}

const emptyEntry = { title: '', organization: '', location: '', start: '', end: '', description: '' }

const currentMonth = () => new Date().toISOString().slice(0, 7)

function FieldError({ message }) {
  return message ? <span className="mt-1.5 block text-xs font-semibold text-rose-300">{message}</span> : null
}

function EntryModal({ section, entry, onClose, onSave }) {
  const copy = sectionCopy[section]
  const formId = useId()
  const [form, setForm] = useState(() => ({ ...emptyEntry, ...entry }))
  const [isCurrent, setIsCurrent] = useState(Boolean(entry?.id) && !entry.end)
  const [errors, setErrors] = useState({})

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Este campo es obligatorio.'
    if (!form.organization.trim()) nextErrors.organization = 'Este campo es obligatorio.'
    if (!form.start) nextErrors.start = 'Indica la fecha de inicio.'
    else if (form.start > currentMonth()) nextErrors.start = 'La fecha de inicio no puede ser futura.'
    if (!isCurrent && !form.end) nextErrors.end = 'Indica la fecha de finalizacion o marca la casilla.'
    else if (!isCurrent && form.start && form.end < form.start) nextErrors.end = 'Debe ser posterior a la fecha de inicio.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    onSave(section, {
      ...form,
      title: form.title.trim(),
      organization: form.organization.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      end: isCurrent ? '' : form.end,
    })
  }

  return (
    <Modal
      open
      title={entry?.id ? `Editar ${copy.noun}` : `Agregar ${copy.noun}`}
      onClose={onClose}
      actions={<>
        <button className="btn-secondary" type="button" onClick={onClose}>Cancelar</button>
        <button className="btn-primary" type="submit" form={formId}>Guardar</button>
      </>}
    >
      <form className="max-h-[60vh] space-y-4 overflow-y-auto pr-1" id={formId} onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-semibold text-white">
          {copy.title} <span className="text-mint">*</span>
          <input className="field mt-2" value={form.title} onChange={update('title')} placeholder={copy.titlePlaceholder} maxLength={90} aria-invalid={Boolean(errors.title)} autoFocus />
          <FieldError message={errors.title} />
        </label>
        <label className="block text-sm font-semibold text-white">
          {copy.organization} <span className="text-mint">*</span>
          <input className="field mt-2" value={form.organization} onChange={update('organization')} placeholder={copy.organizationPlaceholder} maxLength={90} aria-invalid={Boolean(errors.organization)} />
          <FieldError message={errors.organization} />
        </label>
        <label className="block text-sm font-semibold text-white">
          Ubicacion
          <input className="field mt-2" value={form.location} onChange={update('location')} placeholder="Ej. Bogota o Remoto" maxLength={60} />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white">
            Inicio <span className="text-mint">*</span>
            <input className="field mt-2 [color-scheme:dark]" type="month" value={form.start} max={currentMonth()} onChange={update('start')} aria-invalid={Boolean(errors.start)} />
            <FieldError message={errors.start} />
          </label>
          <label className="block text-sm font-semibold text-white">
            Finalizacion
            <input className="field mt-2 [color-scheme:dark] disabled:opacity-40" type="month" value={isCurrent ? '' : form.end} min={form.start} onChange={update('end')} disabled={isCurrent} aria-invalid={Boolean(errors.end)} />
            <FieldError message={errors.end} />
          </label>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
          <input className="accent-mint" type="checkbox" checked={isCurrent} onChange={(event) => setIsCurrent(event.target.checked)} />
          {copy.current}
        </label>
        <label className="block text-sm font-semibold text-white">
          Descripcion
          <textarea className="field mt-2 min-h-24 resize-y" value={form.description} onChange={update('description')} placeholder="Logros, responsabilidades o tecnologias utilizadas" maxLength={400} />
          <span className="mt-1 block text-right text-xs font-normal text-slate-500">{form.description.length}/400</span>
        </label>
      </form>
    </Modal>
  )
}

export default EntryModal
