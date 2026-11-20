// Configuracion de ejemplo de la cuenta del usuario autenticado.
// Sustituir por la respuesta del backend cuando exista el endpoint (ver src/settings/README.md).

export const settingsSections = [
  { id: 'cuenta', label: 'Cuenta', icon: 'user', description: 'Datos de acceso y gestion de tu cuenta.' },
  { id: 'seguridad', label: 'Seguridad', icon: 'shield', description: 'Contrasena, verificacion en dos pasos y sesiones activas.' },
  { id: 'notificaciones', label: 'Notificaciones', icon: 'bell', description: 'Elige que avisos recibes y por que canal.' },
  { id: 'privacidad', label: 'Privacidad', icon: 'eye', description: 'Controla quien ve tu perfil y gestiona tus datos.' },
  { id: 'preferencias', label: 'Preferencias', icon: 'sliders', description: 'Idioma, zona horaria y experiencia de uso.' },
]

export const notificationChannels = [
  { id: 'email', label: 'Correo', icon: 'mail' },
  { id: 'push', label: 'Navegador', icon: 'monitor' },
  { id: 'sms', label: 'SMS', icon: 'phone' },
]

export const notificationCategories = [
  { id: 'ofertas', label: 'Ofertas recomendadas', description: 'Trabajos que coinciden con tus habilidades.' },
  { id: 'postulaciones', label: 'Estado de postulaciones', description: 'Cambios de etapa y respuestas de las empresas.' },
  { id: 'mensajes', label: 'Mensajes de empresas', description: 'Nuevos mensajes e invitaciones a entrevistas.' },
  { id: 'cursos', label: 'Recordatorios de cursos', description: 'Avances pendientes y nuevos cursos sugeridos.' },
  { id: 'novedades', label: 'Novedades de Work+Income', description: 'Funciones nuevas, eventos y promociones.' },
]

export const alertFrequencies = [
  { value: 'inmediata', label: 'Inmediata' },
  { value: 'diaria', label: 'Resumen diario' },
  { value: 'semanal', label: 'Resumen semanal' },
]

export const visibilityOptions = [
  { value: 'publico', label: 'Publico', description: 'Cualquier persona con el enlace puede ver tu perfil.' },
  { value: 'empresas', label: 'Solo empresas', description: 'Solo empresas verificadas en Work+Income.' },
  { value: 'privado', label: 'Privado', description: 'Solo las empresas a las que te postulas.' },
]

export const languageOptions = [
  { value: 'es', label: 'Espanol' },
  { value: 'en', label: 'English (proximamente)', disabled: true },
]

export const timezoneOptions = [
  { value: 'America/Bogota', label: 'Bogota (GMT-5)' },
  { value: 'America/Mexico_City', label: 'Ciudad de Mexico (GMT-6)' },
  { value: 'America/Lima', label: 'Lima (GMT-5)' },
  { value: 'America/Santiago', label: 'Santiago (GMT-3)' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
]

export const startPageOptions = [
  { value: 'trabajos', label: 'Trabajos' },
  { value: 'cursos', label: 'Cursos' },
  { value: 'perfil', label: 'Perfil' },
]

export const twoFactorMethods = [
  { value: 'app', label: 'Aplicacion de autenticacion', description: 'Codigos desde Google Authenticator, Authy u otra app.' },
  { value: 'sms', label: 'Mensaje de texto', description: 'Codigo enviado a tu telefono registrado.' },
]

const allChannels = (email, push, sms) => ({ email, push, sms })

export const defaultSettings = {
  account: { username: 'alejandra.martinez' },
  security: { twoFactor: false, twoFactorMethod: 'app', loginAlerts: true, passwordUpdatedAt: '2026-06-18' },
  notifications: {
    matrix: {
      ofertas: allChannels(true, true, false),
      postulaciones: allChannels(true, true, true),
      mensajes: allChannels(true, true, false),
      cursos: allChannels(true, false, false),
      novedades: allChannels(false, false, false),
    },
    alertFrequency: 'diaria',
  },
  privacy: { visibility: 'empresas', searchable: true, showPhone: false, showRate: true, allowMessages: true },
  preferences: { language: 'es', timezone: 'America/Bogota', startPage: 'trabajos', reduceMotion: false },
  sessions: [
    { id: 'ses-1', device: 'Chrome en Windows', icon: 'monitor', location: 'Medellin, Colombia', lastActive: 'Activa ahora', current: true },
    { id: 'ses-2', device: 'Safari en iPhone', icon: 'phone', location: 'Medellin, Colombia', lastActive: 'Hace 2 horas', current: false },
    { id: 'ses-3', device: 'Firefox en macOS', icon: 'monitor', location: 'Bogota, Colombia', lastActive: 'Hace 5 dias', current: false },
  ],
}
