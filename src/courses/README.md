# Modulo Courses

Frontend del modulo de cursos de Work+Income. Es solo interfaz: los datos vienen de un catalogo de ejemplo y el progreso se guarda en `localStorage`.

## Rutas

| Ruta | Vista |
| --- | --- |
| `#/cursos` | Catalogo con busqueda, filtros, orden y pestanas "Explorar" / "Mis cursos" |
| `#/cursos/:id` | Detalle del curso: temario, inscripcion, progreso y cursos relacionados |

El enrutado por hash esta en `src/hooks/useHashRoute.js` y `src/AppRouter.jsx`. Abre `http://localhost:5173/#/cursos` para entrar directamente al catalogo.

## Estructura

```
src/courses/
  CoursesPage.jsx            Pagina del modulo (catalogo, detalle o no encontrado)
  filters.js                 Filtros por defecto, ordenamiento y filtrado
  utils.js                   Formatos (duracion, precio), progreso y estilos por nivel
  data/courses.js            Catalogo de ejemplo y normalizacion de datos
  hooks/useCourseProgress.js Inscripciones y lecciones completadas (localStorage)
  components/                CourseCatalog, CourseCard, CourseFilters, LearningSummary,
                             CourseDetail, CourseSyllabus
src/components/              Componentes compartidos: AppHeader, Icon, Modal,
                             ProgressBar, RatingStars, Toast
```

## Integracion pendiente con el backend

Nada de esto se implemento en el backend. Estas son las piezas que el frontend necesita:

1. **Catalogo de cursos.** Por ejemplo, `GET /api/courses/` (con filtros opcionales `category`, `level`, `price`, `max_minutes`, `certificate`, `search`, `ordering`) y `GET /api/courses/:id/`. Hoy se lee de `data/courses.js`. La forma esperada es la de los objetos de `rawCourses`, con los modulos y lecciones como objetos (`id`, `title`, `minutes`, `type`, `preview`) en lugar de tuplas.
2. **Inscripciones.** Por ejemplo, `GET /api/me/enrollments/`, `POST /api/courses/:id/enroll/` y `DELETE /api/courses/:id/enroll/`, para el usuario autenticado. Hoy lo hacen `enroll` y `unenroll` en `useCourseProgress`.
3. **Progreso por leccion.** Por ejemplo, `PUT`/`DELETE /api/me/lessons/:lessonId/completion/`. Hoy lo hace `toggleLesson`. Conviene aplicar las actualizaciones de forma optimista para mantener la interfaz rapida.
4. **Pagos.** Los cursos de pago muestran un modal de confirmacion, pero la inscripcion no cobra nada. Hace falta una pasarela de pagos (por ejemplo, Wompi o PayU) antes de confirmar la inscripcion.
5. **Certificados.** Al completar un curso con certificado se muestra un aviso. Falta el servicio que genera el certificado y lo publica en el perfil.
6. **Contenido de lecciones.** El temario lista las lecciones, pero no hay reproductor de video ni visor de lecturas. Hace falta un endpoint de contenido protegido (solo para usuarios inscritos, salvo las lecciones de vista previa).
7. **Relacion curso-empleo.** `relatedJobs` usa titulos de las ofertas de ejemplo y enlaza a `#/trabajos`. Con el backend deberia referenciar IDs de ofertas y abrir el detalle de cada una.
8. **Autenticacion.** Las inscripciones y el progreso dependen del usuario que inicio sesion en `Login.jsx`.

Al conectar la API, `useCourseProgress` debe mantener la misma firma (`enrollments`, `enroll`, `unenroll`, `toggleLesson`) para no tocar los componentes.
