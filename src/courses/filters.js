import { courseLevels, courses } from './data/courses.js'

export const MAX_HOURS_LIMIT = Math.ceil(Math.max(...courses.map((course) => course.totalMinutes)) / 60)

export const DEFAULT_FILTERS = {
  search: '',
  category: 'Todas',
  levels: courseLevels,
  price: 'todos',
  maxHours: MAX_HOURS_LIMIT,
  certificateOnly: false,
  sort: 'relevancia',
}

export const sortOptions = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'valoracion', label: 'Mejor valorados' },
  { value: 'populares', label: 'Mas populares' },
  { value: 'recientes', label: 'Mas recientes' },
  { value: 'duracion', label: 'Menor duracion' },
  { value: 'precio', label: 'Menor precio' },
]

const sorters = {
  relevancia: () => 0,
  valoracion: (a, b) => b.rating - a.rating,
  populares: (a, b) => b.students - a.students,
  recientes: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  duracion: (a, b) => a.totalMinutes - b.totalMinutes,
  precio: (a, b) => a.price - b.price,
}

export const countActiveFilters = (filters) => [
  filters.category !== DEFAULT_FILTERS.category,
  filters.levels.length !== DEFAULT_FILTERS.levels.length,
  filters.price !== DEFAULT_FILTERS.price,
  filters.maxHours !== DEFAULT_FILTERS.maxHours,
  filters.certificateOnly,
].filter(Boolean).length

export const filterCourses = (list, filters) => {
  const term = filters.search.trim().toLowerCase()

  return list
    .filter((course) => {
      const haystack = `${course.title} ${course.summary} ${course.instructor.name} ${course.skills.join(' ')}`.toLowerCase()
      return (!term || haystack.includes(term))
        && (filters.category === 'Todas' || course.category === filters.category)
        && filters.levels.includes(course.level)
        && (filters.price === 'todos' || (filters.price === 'gratis' ? course.price === 0 : course.price > 0))
        && course.totalMinutes <= filters.maxHours * 60
        && (!filters.certificateOnly || course.certificate)
    })
    .sort(sorters[filters.sort] ?? sorters.relevancia)
}
