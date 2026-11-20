const STAR = 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z'

function Stars({ className }) {
  return (
    <span className={`flex gap-0.5 ${className}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" key={index}><path d={STAR} /></svg>
      ))}
    </span>
  )
}

function RatingStars({ rating, reviews }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="font-bold text-amber-400">{rating.toFixed(1)}</span>
      <span className="relative inline-flex" role="img" aria-label={`Valoracion ${rating.toFixed(1)} de 5`}>
        <Stars className="text-white/15" />
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
          <Stars className="text-amber-400" />
        </span>
      </span>
      {reviews !== undefined && <span className="text-slate-500">({reviews.toLocaleString('es-CO')})</span>}
    </span>
  )
}

export default RatingStars
