# Modulo Settings

Frontend de la configuracion de cuenta de Work+Income. Es solo interfaz: los valores se guardan en `localStorage`.

## Rutas

| Ruta | Seccion |
| --- | --- |
| `#/configuracion` o `#/configuracion/cuenta` | Correo, nombre de usuario, desactivar y eliminar cuenta |
| `#/configuracion/seguridad` | Cambio de contrasena, verificacion en dos pasos, alertas de acceso y sesiones activas |
| `#/configuracion/notificaciones` | Avisos por tipo y canal (correo, navegador, SMS) y frecuencia de alertas |
| `#/configuracion/privacidad` | Visibilidad del perfil, datos de contacto visibles, descarga y borrado de datos |
| `#/configuracion/preferencias` | Idioma, zona horaria, pagina de inicio y reducir animaciones |

Abre `http://localhost:5173/#/configuracion` para entrar directamente a la configuracion.

## Comportamiento

- Las secciones Cuenta, Notificaciones, Privacidad y Preferencias se editan como borrador. Una barra fija permite guardar o descartar los cambios, y el menu marca las secciones con cambios pendientes. Los borradores se conservan al cambiar de seccion.
- En Seguridad, las acciones se aplican al momento y piden confirmacion cuando son sensibles.
- El correo electronico se comparte con el modulo Profile (`useProfile`), asi que existe un solo origen de datos.
- **Funciona hoy, sin backend:**
  - La pagina de inicio la usa `AppRouter` cuando la URL no tiene seccion.
  - "Reducir animaciones" agrega `data-reduce-motion` al elemento `<html>`, y `index.css` desactiva las transiciones en toda la app.
  - "Descargar mis datos" genera un JSON con el perfil, las inscripciones a cursos y la configuracion.
  - "Borrar datos de este dispositivo" elimina las claves `workincome.*` de `localStorage`.

## Estructura

```
src/settings/
  SettingsPage.jsx              Pagina: navegacion, borradores, validacion y guardado
  storage.js                    Lectura de la configuracion y aplicacion de preferencias
  utils.js                      Seguridad de contrasena, descarga JSON y borrado local
  data/settings.js              Valores por defecto, opciones y sesiones de ejemplo
  hooks/useSettings.js          Estado persistido en localStorage
  components/
    SettingsUi.jsx              SettingsCard, SettingRow, SaveBar, OptionCards, DangerButton
    AccountSettings.jsx
    SecuritySettings.jsx
    NotificationSettings.jsx
    PrivacySettings.jsx
    PreferenceSettings.jsx
src/components/Switch.jsx       Interruptor accesible (role="switch") compartido
```

## Integracion pendiente con el backend

Nada de esto se implemento en el backend. Estas son las piezas que el frontend necesita:

1. **Configuracion de la cuenta.** Por ejemplo, `GET /api/me/settings/` y `PATCH /api/me/settings/` con las secciones `notifications`, `privacy` y `preferences`. Hoy lo hace `saveSection` en `useSettings`.
2. **Correo y nombre de usuario.** Por ejemplo, `PATCH /api/me/account/`. El cambio de correo deberia requerir verificacion por enlace, y el backend debe validar que el nombre de usuario sea unico.
3. **Cambio de contrasena.** Por ejemplo, `POST /api/me/password/` con la contrasena actual y la nueva. Hoy solo se valida en el cliente y se actualiza la fecha de "ultima actualizacion"; ninguna contrasena se guarda ni se envia.
4. **Verificacion en dos pasos.** Falta todo el flujo: QR o envio de SMS, verificacion del codigo y codigos de respaldo. Hoy el interruptor solo guarda la preferencia.
5. **Sesiones activas.** Por ejemplo, `GET /api/me/sessions/` y `DELETE /api/me/sessions/:id/`. Hoy las sesiones son datos de ejemplo.
6. **Desactivar y eliminar cuenta.** Por ejemplo, `POST /api/me/deactivate/` y `DELETE /api/me/`, con confirmacion por correo. Hoy solo se muestra un mensaje de confirmacion.
7. **Notificaciones.** El backend debe respetar la matriz tipo x canal y la frecuencia de alertas. Las notificaciones del navegador requieren pedir permiso con la Notification API y un servicio de envio.
8. **Exportacion de datos.** La descarga actual solo incluye lo guardado en el navegador. Una exportacion completa (por ejemplo, para cumplir la Ley 1581 de proteccion de datos) debe generarla el servidor.
9. **Idioma.** El selector solo ofrece Espanol. Agregar mas idiomas requiere preparar la interfaz para traducciones (i18n).
