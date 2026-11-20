import Icon from '../../components/Icon.jsx'
import { formatDuration, lessonTypes } from '../utils.js'

function LessonRow({ lesson, isEnrolled, isCompleted, onToggle }) {
  const type = lessonTypes[lesson.type]
  const content = (
    <>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isCompleted ? 'bg-mint text-ink' : 'bg-white/[0.06] text-slate-400'}`}>
        <Icon name={isCompleted ? 'check' : type.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold ${isCompleted ? 'text-slate-400 line-through decoration-mint/60' : 'text-white'}`}>{lesson.title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{type.label} · {formatDuration(lesson.minutes)}</span>
      </span>
    </>
  )

  if (isEnrolled) {
    return (
      <li>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.04]">
          {content}
          <input className="h-4 w-4 shrink-0 accent-mint" type="checkbox" checked={isCompleted} onChange={onToggle} aria-label={`Marcar "${lesson.title}" como completada`} />
        </label>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 px-3 py-2.5">
      {content}
      {lesson.preview
        ? <span className="shrink-0 rounded-full border border-mint/40 px-2 py-0.5 text-[11px] font-semibold text-mint">Vista previa</span>
        : <Icon name="lock" className="h-4 w-4 shrink-0 text-slate-600" />}
    </li>
  )
}

function CourseSyllabus({ course, completed, isEnrolled, openModules, onToggleModule, onSetAllModules, onToggleLesson }) {
  const allOpen = openModules.length === course.modules.length

  return (
    <section className="scroll-mt-6" id="temario" aria-labelledby="syllabus-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white" id="syllabus-heading">Contenido del curso</h2>
          <p className="mt-1 text-sm text-slate-500">{course.modules.length} modulos · {course.lessonCount} lecciones · {formatDuration(course.totalMinutes)}</p>
        </div>
        <button className="text-sm font-semibold text-mint hover:text-white" type="button" onClick={() => onSetAllModules(!allOpen)}>
          {allOpen ? 'Contraer todo' : 'Expandir todo'}
        </button>
      </div>

      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-panel">
        {course.modules.map((module, index) => {
          const isOpen = openModules.includes(module.id)
          const moduleMinutes = module.lessons.reduce((total, lesson) => total + lesson.minutes, 0)
          const doneCount = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
          const panelId = `${module.id}-panel`

          return (
            <div key={module.id}>
              <h3>
                <button className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => onToggleModule(module.id)}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint/10 font-display text-sm font-semibold text-mint">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{module.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {module.lessons.length} lecciones · {formatDuration(moduleMinutes)}
                      {isEnrolled && <span className={doneCount === module.lessons.length ? 'text-mint' : ''}> · {doneCount}/{module.lessons.length} completadas</span>}
                    </span>
                  </span>
                  <Icon name="chevronDown" className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              {isOpen && (
                <ul className="space-y-1 px-2 pb-3 sm:px-4" id={panelId}>
                  {module.lessons.map((lesson) => (
                    <LessonRow
                      lesson={lesson}
                      isEnrolled={isEnrolled}
                      isCompleted={completed.includes(lesson.id)}
                      onToggle={() => onToggleLesson(lesson.id)}
                      key={lesson.id}
                    />
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CourseSyllabus
