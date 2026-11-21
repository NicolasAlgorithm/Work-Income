import { useEffect } from 'react'
import Icon from './Icon.jsx'

function Toast({ message, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timer)
  }, [message, onClose, duration])

  const isError = message?.tone === 'error'

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6" role="status" aria-live="polite">
      {message && (
        <div className={`pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border bg-panel px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 ${isError ? 'border-rose-400/50' : 'border-mint/40'}`}>
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink ${isError ? 'bg-rose-400' : 'bg-mint'}`}><Icon name={isError ? 'alert' : 'check'} className="h-3.5 w-3.5" /></span>
          <p className="leading-6">{message.text}</p>
          <button className="ml-1 mt-0.5 text-slate-500 hover:text-white" type="button" onClick={onClose} aria-label="Cerrar notificacion">
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Toast
