import Icon from '../../components/Icon.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import CourseCard from '../../courses/components/CourseCard.jsx'
import { courses } from '../../courses/data/courses.js'
import { formatDuration, getCourseProgress } from '../../courses/utils.js'

function LearningStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-5">
      <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-mint/10 text-mint"><Icon name={icon} className="h-5 w-5" /></span>
      <p className="font-display text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  )
}

const getRecommendations = (skills, enrollments) => {
  const normalizedSkills = skills.map((skill) => skill.toLowerCase())
  return courses
    .filter((course) => !enrollments[course.id])
    .map((course) => ({
      course,
      score: course.skills.filter((skill) => normalizedSkills.some((own) => skill.toLowerCase().includes(own) || own.includes(skill.toLowerCase()))).length,
    }))
    .sort((a, b) => b.score - a.score || b.course.rating - a.course.rating)
    .slice(0, 2)
    .map((item) => item.course)
}

function ProfileLearning({ enrollments, skills }) {
  const enrolled = courses
    .filter((course) => enrollments[course.id])
    .map((course) => ({ course, progress: getCourseProgress(course, enrollments[course.id]) }))
  const inProgress = enrolled.filter((item) => item.progress.percent < 100)
  const completed = enrolled.filter((item) => item.progress.percent === 100)
  const studyMinutes = enrolled.reduce((total, item) => total + item.progress.completedMinutes, 0)
  const recommendations = getRecommendations(skills, enrollments)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <LearningStat icon="book" label="Cursos inscritos" value={enrolled.length} />
        <LearningStat icon="check" label="Completados" value={completed.length} />
        <LearningStat icon="award" label="Certificados" value={completed.filter((item) => item.course.certificate).length} />
        <LearningStat icon="clock" label="Tiempo de estudio" value={studyMinutes ? formatDuration(studyMinutes) : '0 min'} />
      </div>

      {enrolled.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-mint/10 text-mint"><Icon name="book" className="h-6 w-6" /></span>
          <p className="font-semibold text-white">Aun no te has inscrito en ningun curso.</p>
          <p className="mt-2 text-sm text-slate-500">Los cursos que completes apareceran aqui y fortaleceran tu perfil ante las empresas.</p>
          <a className="btn-primary mt-6" href="#/cursos">Explorar cursos</a>
        </div>
      ) : (
        <>
          {inProgress.length > 0 && (
            <section aria-labelledby="in-progress-heading">
              <h2 className="mb-4 font-display text-xl font-semibold text-white" id="in-progress-heading">En progreso</h2>
              <ul className="space-y-3">
                {inProgress.map(({ course, progress }) => (
                  <li key={course.id}>
                    <a className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-panel p-4 transition hover:border-mint/60 sm:p-5" href={`#/cursos/${course.id}`}>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint/10 text-2xl" aria-hidden="true">{course.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate font-semibold text-white">{course.title}</p>
                          <span className="shrink-0 text-sm font-semibold text-mint">{progress.percent}%</span>
                        </div>
                        <p className="mb-2 text-xs text-slate-500">{progress.completedLessons} de {course.lessonCount} lecciones</p>
                        <ProgressBar value={progress.percent} label={`Progreso en ${course.title}`} />
                      </div>
                      <Icon name="arrowRight" className="hidden h-5 w-5 shrink-0 text-mint transition-transform group-hover:translate-x-1 sm:block" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {completed.length > 0 && (
            <section aria-labelledby="completed-heading">
              <h2 className="mb-4 font-display text-xl font-semibold text-white" id="completed-heading">Completados</h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {completed.map(({ course }) => (
                  <li className="flex items-center gap-4 rounded-2xl border border-mint/30 bg-mint/[0.06] p-4" key={course.id}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-ink"><Icon name={course.certificate ? 'award' : 'check'} className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <a className="block truncate font-semibold text-white hover:text-mint" href={`#/cursos/${course.id}`}>{course.title}</a>
                      <p className="text-xs text-slate-400">{course.certificate ? 'Certificado obtenido' : 'Curso finalizado'} · {formatDuration(course.totalMinutes)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {recommendations.length > 0 && (
        <section aria-labelledby="recommended-heading">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-white" id="recommended-heading">Recomendados para ti</h2>
              <p className="mt-1 text-sm text-slate-500">Segun las habilidades de tu perfil.</p>
            </div>
            <a className="shrink-0 text-sm font-semibold text-mint hover:text-white" href="#/cursos">Ver todos</a>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {recommendations.map((course) => <CourseCard course={course} progress={null} key={course.id} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProfileLearning
