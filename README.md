# Work-Income

Prototipo frontend de Work+Income construido con React, Vite y Tailwind CSS.

## Desarrollo

```bash
pnpm install
pnpm dev
```

La interfaz queda disponible en `http://localhost:5173/`.

La pantalla de inicio de sesion se puede abrir en un puerto independiente:

```bash
pnpm dev:login
```

La interfaz queda disponible en `http://localhost:5178/`.

## Comprobaciones

```bash
pnpm lint
pnpm build
```

El prototipo incluye una pantalla responsive de acceso y registro, validacion nativa de formularios, mostrar u ocultar contrasena y estados de envio preparados para conectar con el backend de Django.

## Modulo de cursos

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/courses/README.md`](src/courses/README.md).

## Modulo de perfil

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/profile/README.md`](src/profile/README.md).

## Modulo de configuracion

La estructura del modulo y la integracion pendiente con el backend estan documentadas en [`src/settings/README.md`](src/settings/README.md).
