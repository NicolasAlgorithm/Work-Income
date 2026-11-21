# Work-Income

Prototipo frontend de Work+Income construido con React, Vite y Tailwind CSS.

## Alcance

Este repositorio contiene exclusivamente el frontend de Work+Income. No incluye backend, API, base de datos ni autenticacion real.

- Los usuarios y contrasenas se usan solamente como demostracion visual.
- Para iniciar sesion se puede escribir cualquier usuario y una contrasena; ambos campos son obligatorios.
- El nombre de usuario se guarda temporalmente en `sessionStorage` del navegador.
- Los datos de perfil, cursos, configuracion y progreso se guardan en el navegador mediante `localStorage` o `sessionStorage`.
- El cerrar sesion elimina la sesion temporal y vuelve a mostrar el login.
- Ninguna credencial ni dato se envia a un servidor.

## Desarrollo

```bash
pnpm install
pnpm dev
```

La interfaz queda disponible en `http://localhost:5173/`.

El login se muestra en la misma interfaz del puerto `5173`. Al iniciar sesion, la aplicacion abre `#/trabajos` y permite navegar a todos los modulos sin cambiar de puerto.

## Navegacion

La aplicacion utiliza rutas hash en el mismo puerto:

| Ruta | Modulo |
| --- | --- |
| `#/trabajos` | Trabajos |
| `#/cursos` | Cursos |
| `#/perfil` | Perfil |
| `#/configuracion` | Configuracion |

Si el usuario vuelve a abrir el sitio en la misma pestana y conserva la sesion, puede ingresar directamente al contenido sin volver a pasar por el login. El usuario puede cerrar sesion desde el encabezado.

## Comprobaciones

```bash
pnpm lint
pnpm build
```

El prototipo incluye una pantalla responsive de acceso, validacion nativa de formularios, mostrar u ocultar contrasena y estados de interfaz preparados para una futura conexion con el backend de Django.

## Modulo de cursos

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/courses/README.md`](src/courses/README.md).

## Modulo de perfil

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/profile/README.md`](src/profile/README.md).

## Modulo de configuracion

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/settings/README.md`](src/settings/README.md).
