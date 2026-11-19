import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { courses } from '../../courses/data/courses.js'

const suggestedSkills = [...new Set(courses.flatMap((course) => course.skills))]

function SkillsInput({ skills, onChange, max, error }) {
  const [value, setValue] = useState('')
  const [hint, setHint] = useState('')
  const isFull = skills.length >= max
  const suggestions = suggestedSkills.filter((skill) => !skills.some((own) => own.toLowerCase() === skill.toLowerCase())).slice(0, 8)

  const addSkill = (raw) => {
    const skill = raw.trim().replace(/\s+/g, ' ')
    if (!skill) return
    if (skills.some((own) => own.toLowerCase() === skill.toLowerCase())) {
      setHint(`"${skill}" ya esta en tu lista.`)
      return
    }
    if (isFull) {
      setHint(`Puedes agregar hasta ${max} habilidades.`)
      return
    }
    onChange([...skills, skill])
    setValue('')
    setHint('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addSkill(value)
    } else if (event.key === 'Backspace' && !value && skills.length) {
      onChange(skills.slice(0, -1))
    }
  }

  return (
    <div>
      <div className={`flex flex-wrap gap-2 rounded-xl border bg-white/[0.06] p-2.5 transition focus-within:border-mint focus-within:ring-4 focus-within:ring-mint/10 ${error ? 'border-rose-400/60' : 'border-white/15'}`}>
        {skills.map((skill) => (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 py-1 pl-3 pr-1.5 text-xs font-semibold text-mint" key={skill}>
            {skill}
            <button className="grid h-5 w-5 place-items-center rounded-full hover:bg-mint/20" type="button" onClick={() => onChange(skills.filter((item) => item !== skill))} aria-label={`Quitar ${skill}`}>
              <Icon name="close" className="h-3 w-3" />
            </button>
          </span>
        ))}
        <label className="min-w-[10rem] flex-1">
          <span className="sr-only">Agregar habilidad</span>
          <input
            className="w-full bg-transparent px-2 py-1 text-sm text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addSkill(value)}
            placeholder={isFull ? 'Limite alcanzado' : 'Escribe y presiona Enter'}
            maxLength={40}
            disabled={isFull}
          />
        </label>
      </div>
      <div className="mt-1.5 flex justify-between gap-3 text-xs">
        <span className={error || hint ? 'font-semibold text-rose-300' : 'text-slate-500'}>{error || hint || 'Separa con Enter o coma.'}</span>
        <span className="shrink-0 text-slate-500">{skills.length}/{max}</span>
      </div>
      {suggestions.length > 0 && !isFull && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Sugerencias de los cursos de Work+Income</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-mint/60 hover:text-mint" type="button" onClick={() => addSkill(skill)} key={skill}>
                <Icon name="plus" className="h-3 w-3" />{skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsInput
