import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import Modal from '../../components/Modal.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import RatingStars from '../../components/RatingStars.jsx'
import { courses } from '../data/courses.js'
import { formatDuration, formatNumber, formatPrice, getCourseProgress, levelStyles } from '../utils.js'
import CourseCard from './CourseCard.jsx'
import CourseSyllabus from './CourseSyllabus.jsx'

const formatMonth = (date) => new Date(`${date}T00:00:00`).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })

function MetaItem({ icon, children }) {
  return <span className="inline-flex items-center gap-2"><Icon name={icon} className="h-4 w-4 text-mint" />{children}</span>
}

function CourseDetail({ course, enrollments, enroll, unenroll, toggleLesson, onNotify }) {
  const enrollment = enrollments[course.id]
  const isEnrolled = Boolean(enrollment)
  const progress = getCourseProgress(course, enrollment)
  const completed = enrollment?.completed ?? []
  const [openModules, setOpenModules] = useState([course.modules[0].id])
  const [dialog, setDialog] = useState(null)

  const relatedCourses = courses.filter((item) => item.category === course.category && item.id !== course.id).slice(0, 3)
  const includes = [
    { icon: 'clock', text: `${formatDuration(course.totalMinutes)} de contenido` },
    { icon: 'book', text: `${course.lessonCount} lecciones en ${course.modules.length} modulos` },
    { icon: 'code', text: 'Ejercicios practicos y evaluaciones' },
    { icon: 'calendar', text: 'Acceso ilimitado, aprende a tu ritmo' },
    ...(course.certificate ? [{ icon: 'award', text: 'Certificado de finalizacion' }] : []),
  ]

  const toggleModule = (moduleId) => setOpenModules((current) => (current.includes(moduleId) ? current.filter((id) => id !== moduleId) : [...current, moduleId]))
  const setAllModules = (open) => setOpenModules(open ? course.modules.map((module) => module.id) : [])

  const continueCourse = () => {
    const nextModule = course.modules.find((module) => module.lessons.some((lesson) => !completed.includes(lesson.id))) ?? course.modules[0]
    setOpenModules((current) => (current.includes(nextModule.id) ? current : [...current, nextModule.id]))
    document.getElementById('temario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const confirmEnroll = () => {
    enroll(course.id)
    setDialog(null)
    onNotify(`Te inscribiste en "${course.title}". Ya puedes comenzar!`)
  }

  const confirmUnenroll = () => {
    unenroll(course.id)
    setDialog(null)
    onNotify(`Cancelaste tu inscripcion en "${course.title}".`)
  }

  const handleToggleLesson = (lessonId) => {
    const willComplete = !completed.includes(lessonId)
    toggleLesson(course.id, lessonId)
    if (willComplete && completed.length + 1 === course.lessonCount) {
      onNotify(`Felicitaciones! Completaste "${course.title}".`)
    }
  }

  const handleEnrollClick = () => (course.price === 0 ? confirmEnroll() : setDialog('enroll'))

  return (
    <>
      <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white" href="#/cursos">
        <Icon name="chevronLeft" />
        Volver a cursos
      </a>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-mint/10 via-panel to-panel p-6 md:p-8 lg:col-span-2" aria-labelledby="course-title">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="text-4xl" aria-hidden="true">{course.icon}</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-mint">{course.category}</span>
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${levelStyles[course.level]}`}>{course.level}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl" id="course-title">{course.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">{course.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <RatingStars rating={course.rating} reviews={course.reviews} />
            <MetaItem icon="users">{formatNumber(course.students)} estudiantes</MetaItem>
            <MetaItem icon="clock">{formatDuration(course.totalMinutes)}</MetaItem>
            <MetaItem icon="calendar">Actualizado en {formatMonth(course.publishedAt)}</MetaItem>
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mint/15 font-display font-semibold text-mint" aria-hidden="true">
              {course.instructor.name.split(' ').map((part) => part[0]).join('')}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{course.instructor.name}</p>
              <p className="text-xs text-slate-500">{course.instructor.role}</p>
            </div>
          </div>
        </section>

        <aside className="lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <div className="space-y-5 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-white/10 bg-panel p-6 shadow-lg">
              {isEnrolled ? (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Tu progreso</p>
                    <span className="font-display text-2xl font-semibold text-mint">{progress.percent}%</span>
                  </div>
                  <ProgressBar value={progress.percent} label={`Progreso en ${course.title}`} className="h-2.5" />
                  <p className="mt-2 text-xs text-slate-500">{progress.completedLessons} de {course.lessonCount} lecciones completadas</p>

                  {progress.percent === 100 && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-mint/40 bg-mint/10 p-4">
                      <Icon name="award" className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                      <div>
                        <p className="text-sm font-semibold text-white">Curso completado</p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{course.certificate ? 'Tu certificado estara disponible en tu perfil.' : 'Sigue aprendiendo con otro curso relacionado.'}</p>
                      </div>
                    </div>
                  )}

                  <button className="btn-primary mt-6 w-full" type="button" onClick={continueCourse}>
                    {progress.percent === 0 ? 'Comenzar curso' : progress.percent === 100 ? 'Repasar contenido' : 'Continuar curso'}
                  </button>
                  <button className="mt-3 w-full text-center text-xs font-semibold text-slate-500 hover:text-white" type="button" onClick={() => setDialog('unenroll')}>
                    Cancelar inscripcion
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Precio</p>
                  <p className={`mt-1 font-display text-3xl font-semibold ${course.price === 0 ? 'text-mint' : 'text-amber-400'}`}>{formatPrice(course.price)}</p>
                  <button className="btn-primary mt-6 w-full" type="button" onClick={handleEnrollClick}>
                    {course.price === 0 ? 'Inscribirme gratis' : 'Inscribirme ahora'}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">Empieza cuando quieras, sin horarios fijos.</p>
                </>
              )}

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                {includes.map((item) => (
                  <li className="flex items-center gap-3" key={item.text}><Icon name={item.icon} className="h-4 w-4 shrink-0 text-mint" />{item.text}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-panel p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Habilidades que obtendras</h2>
              <ul className="flex flex-wrap gap-2">
                {course.skills.map((skill) => <li className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300" key={skill}>{skill}</li>)}
              </ul>
            </div>

            {course.relatedJobs.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-panel p-6">
                <h2 className="mb-1 font-display text-lg font-semibold text-white">Te prepara para</h2>
                <p className="mb-4 text-xs text-slate-500">Ofertas activas en Work+Income</p>
                <ul className="space-y-2">
                  {course.relatedJobs.map((job) => (
                    <li key={job}>
                      <a className="group flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-white transition hover:border-mint/60" href="#/trabajos">
                        <Icon name="briefcase" className="h-4 w-4 shrink-0 text-amber-400" />
                        <span className="flex-1">{job}</span>
                        <Icon name="arrowRight" className="h-4 w-4 text-mint transition-transform group-hover:translate-x-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <div className="space-y-10 lg:col-span-2">
          <section className="rounded-2xl border border-white/10 bg-panel p-6 md:p-8" aria-labelledby="outcomes-heading">
            <h2 className="mb-5 font-display text-2xl font-semibold text-white" id="outcomes-heading">Lo que aprenderas</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li className="flex items-start gap-3 text-sm leading-6" key={outcome}>
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint/15 text-mint"><Icon name="check" className="h-3 w-3" /></span>
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <CourseSyllabus
            course={course}
            completed={completed}
            isEnrolled={isEnrolled}
            openModules={openModules}
            onToggleModule={toggleModule}
            onSetAllModules={setAllModules}
            onToggleLesson={handleToggleLesson}
          />

          {relatedCourses.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 className="mb-5 font-display text-2xl font-semibold text-white" id="related-heading">Cursos relacionados</h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {relatedCourses.map((item) => <CourseCard course={item} progress={getCourseProgress(item, enrollments[item.id])} key={item.id} />)}
              </div>
            </section>
          )}
        </div>
      </div>

      <Modal
        open={dialog === 'enroll'}
        title="Confirmar inscripcion"
        onClose={() => setDialog(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setDialog(null)}>Cancelar</button>
          <button className="btn-primary" type="button" onClick={confirmEnroll} autoFocus>Inscribirme</button>
        </>}
      >
        <p>Vas a inscribirte en <span className="font-semibold text-white">{course.title}</span>.</p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <span>Total</span>
          <span className="font-display text-lg font-semibold text-amber-400">{formatPrice(course.price)}</span>
        </div>
      </Modal>

      <Modal
        open={dialog === 'unenroll'}
        title="Cancelar inscripcion"
        onClose={() => setDialog(null)}
        actions={<>
          <button className="btn-secondary" type="button" onClick={() => setDialog(null)} autoFocus>Mantener curso</button>
          <button className="rounded-xl bg-rose-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-500/20" type="button" onClick={confirmUnenroll}>Si, cancelar</button>
        </>}
      >
        <p>Perderas el progreso registrado en <span className="font-semibold text-white">{course.title}</span>. Esta accion no se puede deshacer.</p>
      </Modal>
    </>
  )
}

export default CourseDetail
