import { useEffect, useId } from 'react'
import Icon from './Icon.jsx'

function Modal({ open, title, onClose, children, actions }) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    const handleKey = (event) => { if (event.key === 'Escape') onClose() }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/80 p-4 backdrop-blur-sm sm:items-center" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-panel p-6 shadow-2xl shadow-black/50" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-white" id={titleId}>{title}</h2>
          <button className="text-slate-500 hover:text-white" type="button" onClick={onClose} aria-label="Cerrar"><Icon name="close" className="h-5 w-5" /></button>
        </div>
        <div className="text-sm leading-6 text-slate-400">{children}</div>
        {actions && <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{actions}</div>}
      </div>
    </div>
  )
}

export default Modal
