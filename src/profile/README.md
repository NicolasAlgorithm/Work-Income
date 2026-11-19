# Modulo Profile

Frontend del perfil del usuario en Work+Income. Es solo interfaz: los datos vienen de un perfil de ejemplo y los cambios se guardan en `localStorage`.

## Rutas

| Ruta | Vista |
| --- | --- |
| `#/perfil` | Resumen: sobre mi, habilidades, experiencia, educacion e idiomas |
| `#/perfil/aprendizaje` | Cursos en progreso y completados (datos reales del modulo Courses) y recomendaciones |
| `#/perfil/postulaciones` | Postulaciones a trabajos con su estado y etapa del proceso |
| `#/perfil/editar` | Formulario de edicion del perfil |

`pnpm dev:profile` abre la app directamente en el perfil.

## Estructura

```
src/profile/
  ProfilePage.jsx            Pagina del modulo: pestanas, modales y notificaciones
  utils.js                   Formatos de fecha, validaciones e indice de completitud
  data/profile.js            Perfil y postulaciones de ejemplo, opciones de formularios
  hooks/useProfile.js        Estado del perfil persistido en localStorage
  components/
    ProfileHeader.jsx        Portada, foto, nombre, disponibilidad y estadisticas
    ProfileSidebar.jsx       Completitud, preferencias laborales y contacto
    ProfileOverview.jsx      Secciones del resumen y lista de experiencia/educacion
    ProfileLearning.jsx      Progreso de cursos y recomendaciones
    ProfileApplications.jsx  Postulaciones con filtros por estado
    ProfileEditForm.jsx      Formulario de edicion con validacion y vista previa
    SkillsInput.jsx          Campo de etiquetas para habilidades
    EntryModal.jsx           Modal para agregar o editar experiencia y educacion
```

Reutiliza `AppHeader`, `Icon`, `Modal`, `ProgressBar` y `Toast` de `src/components/`, y del modulo Courses: `CourseCard`, el catalogo, `useCourseProgress` y `getCourseProgress`.

## Integracion pendiente con el backend

Nada de esto se implemento en el backend. Estas son las piezas que el frontend necesita:

1. **Perfil del usuario autenticado.** Por ejemplo, `GET /api/me/profile/` y `PATCH /api/me/profile/`. Hoy los datos salen de `defaultProfile` y se guardan con `updateProfile`. El usuario debe venir de la sesion iniciada en `Login.jsx`.
2. **Experiencia y educacion.** Por ejemplo, `POST`, `PATCH` y `DELETE` en `/api/me/experience/` y `/api/me/education/`. Hoy lo hacen `saveEntry` y `removeEntry`. Las fechas se manejan como `YYYY-MM` y `end` vacio significa "actualidad".
3. **Foto de perfil.** La imagen se lee con `FileReader` y se guarda como data URL (maximo 1 MB). Hace falta un endpoint de carga, por ejemplo `POST /api/me/avatar/`, que devuelva la URL publica, y guardar esa URL en lugar del data URL.
4. **Postulaciones.** Por ejemplo, `GET /api/me/applications/`. Hoy se usan las postulaciones de ejemplo de `data/profile.js`. Los estados esperados son `enviada`, `revision`, `entrevista`, `oferta` y `cerrada`. La pagina de Trabajos todavia no permite postularse.
5. **Progreso de cursos y certificados.** La pestana Aprendizaje lee `useCourseProgress`. Al conectar el backend de Courses (ver `src/courses/README.md`) se actualiza automaticamente.
6. **Compartir perfil.** El boton copia `#/perfil`, que es la vista privada del usuario. Hace falta una URL publica por usuario, por ejemplo `/perfil/:username`, con su endpoint de solo lectura.
7. **Validaciones.** Las validaciones del formulario son solo del lado del cliente. El backend debe repetirlas y devolver los errores por campo para mostrarlos en el formulario.

Al conectar la API, `useProfile` debe mantener la misma firma (`profile`, `updateProfile`, `saveEntry`, `removeEntry`) para no tocar los componentes.
