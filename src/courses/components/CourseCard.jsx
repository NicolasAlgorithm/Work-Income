import Icon from '../../components/Icon.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import RatingStars from '../../components/RatingStars.jsx'
import { formatDuration, formatNumber, formatPrice, levelStyles } from '../utils.js'

const NEW_COURSE_DAYS = 30

const isRecent = (date) => (Date.now() - new Date(date).getTime()) / 86400000 <= NEW_COURSE_DAYS

function CourseCard({ course, progress }) {
  const isEnrolled = Boolean(progress)

  return (
    <a
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-lg transition hover:-translate-y-1 hover:border-mint/60 focus:outline-none focus-visible:border-mint focus-visible:ring-4 focus-visible:ring-mint/20"
      href={`#/cursos/${course.id}`}
    >
      <div className="relative flex h-32 items-center justify-center border-b border-white/10 bg-gradient-to-br from-mint/15 via-white/[0.03] to-transparent">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{course.icon}</span>
        <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${levelStyles[course.level]}`}>{course.level}</span>
        <div className="absolute right-4 top-4 flex gap-2">
          {isRecent(course.publishedAt) && <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">Nuevo</span>}
          {isEnrolled && <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">Inscrito</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mint">{course.category}</p>
        <h3 className="font-display text-lg font-semibold leading-tight text-white">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{course.summary}</p>
        <p className="mt-3 text-xs text-slate-500">Por <span className="font-semibold text-slate-300">{course.instructor.name}</span></p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
          <RatingStars rating={course.rating} reviews={course.reviews} />
          <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5" />{formatDuration(course.totalMinutes)}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="book" className="h-3.5 w-3.5" />{course.lessonCount} lecciones</span>
        </div>

        <div className="mt-auto pt-5">
          {isEnrolled ? (
            <div className="border-t border-white/10 pt-4">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">{progress.percent === 100 ? 'Completado' : `${progress.percent}% completado`}</span>
                <span className="inline-flex items-center gap-1 text-mint">{progress.percent === 100 ? 'Repasar' : 'Continuar'}<Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </div>
              <ProgressBar value={progress.percent} label={`Progreso en ${course.title}`} />
            </div>
          ) : (
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className={`text-sm font-semibold ${course.price === 0 ? 'text-mint' : 'text-amber-400'}`}>{formatPrice(course.price)}</span>
              <span className="inline-flex items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5"><Icon name="users" className="h-3.5 w-3.5" />{formatNumber(course.students)}</span>
                <Icon name="arrowRight" className="h-4 w-4 text-mint transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

export default CourseCard
