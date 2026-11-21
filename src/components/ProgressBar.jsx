function ProgressBar({ value, label = 'Progreso', className = 'h-2' }) {
  const percent = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div className={`w-full overflow-hidden rounded-full bg-white/10 ${className}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <div className="h-full rounded-full bg-mint transition-[width] duration-500" style={{ width: `${percent}%` }} />
    </div>
  )
}

export default ProgressBar
