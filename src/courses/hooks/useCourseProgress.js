import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'workincome.courses.enrollments'

const readEnrollments = () => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

// Estado local de inscripciones y lecciones completadas.
// Persistido en localStorage mientras no exista la API de progreso del backend.
export function useCourseProgress() {
  const [enrollments, setEnrollments] = useState(readEnrollments)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments))
    } catch {
      // El almacenamiento puede no estar disponible (modo privado); el estado sigue en memoria.
    }
  }, [enrollments])

  const enroll = useCallback((courseId) => {
    setEnrollments((current) => {
      if (current[courseId]) return current
      const now = new Date().toISOString()
      return { ...current, [courseId]: { enrolledAt: now, lastActivity: now, completed: [] } }
    })
  }, [])

  const unenroll = useCallback((courseId) => {
    setEnrollments((current) => {
      const next = { ...current }
      delete next[courseId]
      return next
    })
  }, [])

  const toggleLesson = useCallback((courseId, lessonId) => {
    setEnrollments((current) => {
      const enrollment = current[courseId]
      if (!enrollment) return current
      const completed = enrollment.completed.includes(lessonId)
        ? enrollment.completed.filter((id) => id !== lessonId)
        : [...enrollment.completed, lessonId]
      return { ...current, [courseId]: { ...enrollment, completed, lastActivity: new Date().toISOString() } }
    })
  }, [])

  return { enrollments, enroll, unenroll, toggleLesson }
}
