import Icon from '../../components/Icon.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { formatDuration } from '../utils.js'

function StatTile({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-panel p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint/10 text-mint"><Icon name={icon} className="h-5 w-5" /></span>
      <div>
        <p className="font-display text-2xl font-semibold text-white">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      </div>
    </div>
  )
}

function LearningSummary({ enrolledCourses, freeCount, onShowFree }) {
  if (enrolledCourses.length === 0) {
    return (
      <section className="mb-8 flex flex-col gap-5 overflow-hidden rounded-2xl border border-mint/30 bg-gradient-to-r from-mint/15 via-panel to-panel p-6 md:flex-row md:items-center md:justify-between md:p-8" aria-label="Comienza a aprender">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint text-ink"><Icon name="sparkles" className="h-6 w-6" /></span>
          <div>
            <h2 className="font-display text-xl font-semibold text-white md:text-2xl">Aprende las habilidades que piden las empresas</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Cursos practicos creados por profesionales y conectados con las ofertas de trabajo de Work+Income. Empieza hoy con {freeCount} cursos gratuitos.</p>
          </div>
        </div>
        <button className="btn-primary shrink-0" type="button" onClick={onShowFree}>Ver cursos gratis</button>
      </section>
    )
  }

  const completedLessons = enrolledCourses.reduce((total, item) => total + item.progress.completedLessons, 0)
  const learnedMinutes = enrolledCourses.reduce((total, item) => total + item.progress.completedMinutes, 0)
  const inProgress = enrolledCourses
    .filter((item) => item.progress.percent < 100)
    .sort((a, b) => b.enrollment.lastActivity.localeCompare(a.enrollment.lastActivity))[0]

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4" aria-label="Mi aprendizaje">
      <StatTile icon="book" label="Cursos inscritos" value={enrolledCourses.length} />
      <StatTile icon="check" label="Lecciones completadas" value={completedLessons} />
      <StatTile icon="clock" label="Tiempo de estudio" value={learnedMinutes ? formatDuration(learnedMinutes) : '0 min'} />
      {inProgress ? (
        <a className="group flex flex-col justify-center gap-3 rounded-2xl border border-mint/40 bg-mint/10 p-5 transition hover:border-mint sm:col-span-3 xl:col-span-1" href={`#/cursos/${inProgress.course.id}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-mint">Continuar aprendiendo</p>
            <Icon name="arrowRight" className="h-4 w-4 text-mint transition-transform group-hover:translate-x-1" />
          </div>
          <p className="truncate font-semibold text-white">{inProgress.course.title}</p>
          <ProgressBar value={inProgress.progress.percent} label={`Progreso en ${inProgress.course.title}`} />
        </a>
      ) : (
        <div className="flex items-center gap-4 rounded-2xl border border-mint/40 bg-mint/10 p-5 sm:col-span-3 xl:col-span-1">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-ink"><Icon name="award" className="h-5 w-5" /></span>
          <p className="text-sm font-semibold text-white">Completaste todos tus cursos. Explora uno nuevo.</p>
        </div>
      )}
    </section>
  )
}

export default LearningSummary
