function Switch({ checked, onChange, label, disabled = false }) {
  return (
    <button
      className={`relative h-6 w-11 shrink-0 rounded-full transition focus:outline-none focus-visible:ring-4 focus-visible:ring-mint/20 disabled:cursor-not-allowed disabled:opacity-40 ${checked ? 'bg-mint' : 'bg-white/15'}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span className={`absolute left-1 top-1 h-4 w-4 rounded-full transition-transform ${checked ? 'translate-x-5 bg-ink' : 'bg-white'}`} />
    </button>
  )
}

export default Switch
