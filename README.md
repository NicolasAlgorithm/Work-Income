# Work-Income

Prototipo frontend de Work+Income construido con React, Vite y Tailwind CSS.

## Desarrollo

```bash
pnpm install
pnpm dev
```

La interfaz queda disponible en `http://localhost:5173/`.

## Comprobaciones

```bash
pnpm lint
pnpm build
```

El prototipo incluye una pantalla responsive de acceso y registro, validacion nativa de formularios, mostrar u ocultar contrasena y estados de envio preparados para conectar con el backend de Django.

## Modulo de cursos

La seccion **Cursos** (`#/cursos`) ofrece un catalogo con busqueda, filtros y ordenamiento, una pestana "Mis cursos" con el progreso de aprendizaje, y una vista de detalle con temario, inscripcion y cursos relacionados. Para abrirla directamente:

```bash
pnpm dev:courses
```

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/courses/README.md`](src/courses/README.md).

## Modulo de perfil

La seccion **Perfil** (`#/perfil`) muestra el perfil profesional del usuario: foto, disponibilidad, completitud del perfil, experiencia, educacion, idiomas, progreso en cursos y estado de las postulaciones. Incluye un formulario de edicion con validacion y vista previa. Para abrirla directamente:

```bash
pnpm dev:profile
```

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/profile/README.md`](src/profile/README.md).

## Modulo de configuracion

La seccion **Configuracion** (`#/configuracion`) agrupa la cuenta, la seguridad (contrasena, verificacion en dos pasos y sesiones), las notificaciones por tipo y canal, la privacidad del perfil con descarga de datos, y preferencias como la zona horaria, la pagina de inicio y reducir animaciones. Para abrirla directamente:

```bash
pnpm dev:settings
```

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/settings/README.md`](src/settings/README.md).
