import { courseCategories, courseLevels } from '../data/courses.js'

const priceOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'gratis', label: 'Gratis' },
  { value: 'pago', label: 'De pago' },
]

function CourseFilters({ filters, maxHoursLimit, onChange, onReset }) {
  const toggleLevel = (level) => {
    const levels = filters.levels.includes(level)
      ? filters.levels.filter((item) => item !== level)
      : [...filters.levels, level]
    onChange({ levels })
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-white">Filtros</h2>
        <button className="text-xs font-semibold text-mint hover:text-white" type="button" onClick={onReset}>Limpiar</button>
      </div>

      <div className="mb-6">
        <label className="mb-3 block font-semibold text-white" htmlFor="course-category">Categoria</label>
        <select className="field py-2.5" id="course-category" value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
          <option>Todas</option>
          {courseCategories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>

      <fieldset className="mb-6 border-t border-white/10 pt-5">
        <legend className="mb-3 float-left w-full font-semibold text-white">Nivel</legend>
        <div className="clear-both space-y-3 text-sm">
          {courseLevels.map((level) => (
            <label className="flex cursor-pointer items-center gap-2" key={level}>
              <input className="accent-mint" type="checkbox" checked={filters.levels.includes(level)} onChange={() => toggleLevel(level)} /> {level}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-6 border-t border-white/10 pt-5">
        <legend className="mb-3 float-left w-full font-semibold text-white">Precio</legend>
        <div className="clear-both grid grid-cols-3 gap-2" role="radiogroup">
          {priceOptions.map((option) => {
            const isActive = filters.price === option.value
            return (
              <label className={`cursor-pointer rounded-xl border px-2 py-2 text-center text-xs font-semibold transition ${isActive ? 'border-mint bg-mint/10 text-mint' : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'}`} key={option.value}>
                <input className="sr-only" type="radio" name="course-price" value={option.value} checked={isActive} onChange={() => onChange({ price: option.value })} />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="mb-6 border-t border-white/10 pt-5">
        <div className="mb-3 flex justify-between font-semibold text-white">
          <label htmlFor="course-duration">Duracion maxima</label>
          <span className="text-sm text-mint">{filters.maxHours} h</span>
        </div>
        <input className="w-full accent-mint" id="course-duration" type="range" min="1" max={maxHoursLimit} step="1" value={filters.maxHours} onChange={(event) => onChange({ maxHours: Number(event.target.value) })} />
        <div className="mt-2 flex justify-between text-xs text-slate-500"><span>1 h</span><span>{maxHoursLimit} h</span></div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-white">
          Con certificado
          <input className="peer sr-only" type="checkbox" checked={filters.certificateOnly} onChange={(event) => onChange({ certificateOnly: event.target.checked })} />
          <span className="relative h-6 w-11 shrink-0 rounded-full bg-white/15 transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-mint peer-checked:after:translate-x-5 peer-checked:after:bg-ink peer-focus-visible:ring-4 peer-focus-visible:ring-mint/20" aria-hidden="true" />
        </label>
      </div>
    </div>
  )
}

export default CourseFilters
