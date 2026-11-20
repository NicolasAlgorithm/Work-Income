export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (!hours) return `${rest} min`
  return rest ? `${hours} h ${rest} min` : `${hours} h`
}

export const formatPrice = (price) => (price === 0 ? 'Gratis' : `${price}k COP`)

export const formatNumber = (value) => value.toLocaleString('es-CO')

export const getCourseProgress = (course, enrollment) => {
  if (!enrollment) return null
  const completed = course.lessonIds.filter((id) => enrollment.completed.includes(id))
  const completedMinutes = course.modules
    .flatMap((module) => module.lessons)
    .filter((lesson) => enrollment.completed.includes(lesson.id))
    .reduce((total, lesson) => total + lesson.minutes, 0)

  return {
    completedLessons: completed.length,
    completedMinutes,
    percent: course.lessonCount ? Math.round((completed.length / course.lessonCount) * 100) : 0,
  }
}

export const levelStyles = {
  Basico: 'border-mint/30 bg-mint/10 text-mint',
  Intermedio: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  Avanzado: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
}

export const lessonTypes = {
  video: { label: 'Video', icon: 'play' },
  lectura: { label: 'Lectura', icon: 'file' },
  practica: { label: 'Practica', icon: 'code' },
  quiz: { label: 'Evaluacion', icon: 'quiz' },
}
