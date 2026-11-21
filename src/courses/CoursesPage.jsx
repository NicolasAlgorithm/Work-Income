import { useCallback, useEffect, useState } from 'react'
import AppHeader from '../components/AppHeader.jsx'
import Icon from '../components/Icon.jsx'
import Toast from '../components/Toast.jsx'
import CourseCatalog from './components/CourseCatalog.jsx'
import CourseDetail from './components/CourseDetail.jsx'
import { getCourseById } from './data/courses.js'
import { DEFAULT_FILTERS } from './filters.js'
import { useCourseProgress } from './hooks/useCourseProgress.js'

function CourseNotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-white/15 p-10 text-center">
      <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-mint/10 text-mint"><Icon name="search" className="h-6 w-6" /></span>
      <h1 className="font-display text-2xl font-semibold text-white">No encontramos este curso</h1>
      <p className="mt-2 text-sm text-slate-500">Es posible que el enlace haya cambiado o que el curso ya no este disponible.</p>
      <a className="btn-primary mt-6" href="#/cursos">Ver todos los cursos</a>
    </div>
  )
}

function CoursesPage({ courseId }) {
  const { enrollments, enroll, unenroll, toggleLesson } = useCourseProgress()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [tab, setTab] = useState('explorar')
  const [toast, setToast] = useState(null)

  const notify = useCallback((text) => setToast({ id: Date.now(), text }), [])
  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [courseId])

  const course = courseId ? getCourseById(courseId) : null

  let content
  if (!courseId) {
    content = <CourseCatalog enrollments={enrollments} filters={filters} onFiltersChange={setFilters} tab={tab} onTabChange={setTab} />
  } else if (course) {
    content = <CourseDetail course={course} enrollments={enrollments} enroll={enroll} unenroll={unenroll} toggleLesson={toggleLesson} onNotify={notify} key={course.id} />
  } else {
    content = <CourseNotFound />
  }

  return (
    <main className="min-h-screen bg-ink font-sans text-slate-300">
      <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">
        <AppHeader active="courses" />
        {content}
      </div>
      <Toast message={toast} onClose={closeToast} key={toast?.id} />
    </main>
  )
}

export default CoursesPage
