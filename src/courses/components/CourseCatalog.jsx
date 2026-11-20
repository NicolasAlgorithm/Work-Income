import { useMemo, useState } from 'react'
import Icon from '../../components/Icon.jsx'
import { courses } from '../data/courses.js'
import { DEFAULT_FILTERS, MAX_HOURS_LIMIT, countActiveFilters, filterCourses, sortOptions } from '../filters.js'
import { getCourseProgress } from '../utils.js'
import CourseCard from './CourseCard.jsx'
import CourseFilters from './CourseFilters.jsx'
import LearningSummary from './LearningSummary.jsx'

const tabs = [
  { value: 'explorar', label: 'Explorar' },
  { value: 'mis-cursos', label: 'Mis cursos' },
]

function CourseCatalog({ enrollments, filters, onFiltersChange, tab, onTabChange }) {
  const [showFilters, setShowFilters] = useState(false)

  const updateFilters = (changes) => onFiltersChange((current) => ({ ...current, ...changes }))
  const resetFilters = () => onFiltersChange((current) => ({ ...DEFAULT_FILTERS, search: current.search, sort: current.sort }))

  const enrolledCourses = useMemo(() => courses
    .filter((course) => enrollments[course.id])
    .map((course) => ({ course, enrollment: enrollments[course.id], progress: getCourseProgress(course, enrollments[course.id]) })), [enrollments])

  const visibleCourses = useMemo(() => {
    const source = tab === 'mis-cursos' ? enrolledCourses.map((item) => item.course) : courses
    return filterCourses(source, filters)
  }, [enrolledCourses, filters, tab])

  const activeFilters = countActiveFilters(filters)
  const freeCount = courses.filter((course) => course.price === 0).length
  const hasNoEnrollments = tab === 'mis-cursos' && enrolledCourses.length === 0

  const showFreeCourses = () => {
    onTabChange('explorar')
    onFiltersChange({ ...DEFAULT_FILTERS, price: 'gratis' })
    document.getElementById('courses-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Aprende y crece</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Cursos para impulsar tu carrera</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Formate en las habilidades mas solicitadas y accede a mejores oportunidades de trabajo.</p>
        </div>
        <label className="relative w-full md:max-w-xs">
          <span className="sr-only">Buscar cursos</span>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input className="field pl-11" type="search" value={filters.search} onChange={(event) => updateFilters({ search: event.target.value })} placeholder="Buscar por curso o habilidad" />
        </label>
      </div>

      <LearningSummary enrolledCourses={enrolledCourses} freeCount={freeCount} onShowFree={showFreeCourses} />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-full rounded-xl border border-white/10 bg-panel p-1 sm:w-auto" role="tablist" aria-label="Vista de cursos">
          {tabs.map((item) => {
            const isActive = tab === item.value
            return (
              <button
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${isActive ? 'bg-mint text-ink' : 'text-slate-400 hover:text-white'}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(item.value)}
                key={item.value}
              >
                {item.label}
                {item.value === 'mis-cursos' && enrolledCourses.length > 0 && <span className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] ${isActive ? 'bg-ink/20' : 'bg-white/10'}`}>{enrolledCourses.length}</span>}
              </button>
            )
          })}
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex-1 lg:hidden" type="button" onClick={() => setShowFilters((visible) => !visible)} aria-expanded={showFilters} aria-controls="course-filters">
            <Icon name="filter" />
            Filtros
            {activeFilters > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-mint px-1 text-[11px] text-ink">{activeFilters}</span>}
          </button>
          <label className="flex flex-1 items-center gap-2 text-sm sm:flex-none">
            <span className="hidden whitespace-nowrap text-slate-500 sm:inline">Ordenar por</span>
            <span className="sr-only sm:hidden">Ordenar por</span>
            <select className="field py-2.5" value={filters.sort} onChange={(event) => updateFilters({ sort: event.target.value })}>
              {sortOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className={`h-fit lg:sticky lg:top-6 lg:col-span-1 lg:block ${showFilters ? 'block' : 'hidden'}`} id="course-filters">
          <CourseFilters filters={filters} maxHoursLimit={MAX_HOURS_LIMIT} onChange={updateFilters} onReset={resetFilters} />
        </aside>

        <section className="lg:col-span-3" aria-labelledby="courses-heading">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="scroll-mt-6 font-display text-2xl font-semibold text-white" id="courses-heading">{tab === 'mis-cursos' ? 'Mis cursos' : 'Cursos disponibles'}</h2>
            <span className="text-sm text-slate-500">{visibleCourses.length} resultados</span>
          </div>

          {hasNoEnrollments ? (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-mint/10 text-mint"><Icon name="book" className="h-6 w-6" /></span>
              <p className="font-semibold text-white">Aun no te has inscrito en ningun curso.</p>
              <p className="mt-2 text-sm text-slate-500">Explora el catalogo y empieza a aprender a tu ritmo.</p>
              <button className="btn-primary mt-6" type="button" onClick={() => onTabChange('explorar')}>Explorar cursos</button>
            </div>
          ) : visibleCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleCourses.map((course) => <CourseCard course={course} progress={getCourseProgress(course, enrollments[course.id])} key={course.id} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <p className="font-semibold text-white">No encontramos cursos con esos filtros.</p>
              <p className="mt-2 text-sm text-slate-500">Prueba con otra categoria, nivel o una busqueda diferente.</p>
              <button className="btn-secondary mt-6" type="button" onClick={() => onFiltersChange(DEFAULT_FILTERS)}>Restablecer filtros</button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default CourseCatalog
