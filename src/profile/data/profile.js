// Datos de ejemplo del perfil del usuario autenticado.
// Sustituir por la respuesta del backend cuando exista el endpoint (ver src/profile/README.md).

export const availabilityOptions = [
  { value: 'disponible', label: 'Disponible para trabajar', description: 'Buscas activamente nuevas oportunidades.', className: 'border-mint/40 bg-mint/10 text-mint' },
  { value: 'propuestas', label: 'Abierto a propuestas', description: 'Escuchas ofertas sin buscar activamente.', className: 'border-amber-400/40 bg-amber-400/10 text-amber-300' },
  { value: 'no-disponible', label: 'No disponible', description: 'Tu perfil no aparece en busquedas de empresas.', className: 'border-white/15 bg-white/[0.04] text-slate-400' },
]

export const modalityOptions = ['Remoto', 'Hibrido', 'Presencial']

export const languageLevels = ['Basico', 'Intermedio', 'Avanzado', 'Nativo']

export const PROFILE_LIMITS = { about: 600, headline: 90, skills: 15, languages: 6 }

export const defaultProfile = {
  name: 'Alejandra Martinez',
  headline: 'Desarrolladora web | Python, Django y React',
  email: 'alejandra.martinez@correo.com',
  phone: '',
  location: 'Medellin, Colombia',
  website: '',
  about: 'Desarrolladora web desde 2023, construyendo aplicaciones para empresas medianas y emprendimientos en crecimiento. Me enfoco en crear APIs confiables y experiencias de usuario claras. Busco proyectos remotos donde pueda seguir creciendo en arquitectura backend y servicios en la nube.',
  avatar: null,
  memberSince: '2026-03-01',
  availability: 'disponible',
  modalities: ['Remoto', 'Hibrido'],
  hourlyRate: 70,
  skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Git'],
  languages: [
    { name: 'Espanol', level: 'Nativo' },
    { name: 'Ingles', level: 'Intermedio' },
  ],
  experience: [
    { id: 'exp-1', title: 'Desarrolladora web', organization: 'Agencia Pixel Andino', location: 'Medellin (hibrido)', start: '2024-02', end: '', description: 'Desarrollo de APIs con Django REST Framework e interfaces en React para clientes del sector comercio. Implementacion de pruebas automatizadas y despliegues continuos.' },
    { id: 'exp-2', title: 'Practicante de desarrollo', organization: 'Cooperativa Financiera del Valle', location: 'Remoto', start: '2023-01', end: '2023-12', description: 'Mantenimiento de herramientas internas y automatizacion de reportes con Python.' },
  ],
  education: [
    { id: 'edu-1', title: 'Tecnologia en Desarrollo de Software', organization: 'Institucion Universitaria de Antioquia', location: 'Medellin', start: '2020-02', end: '2022-11', description: '' },
  ],
}

export const applicationStatuses = {
  enviada: { label: 'Enviada', step: 0, className: 'border-white/15 bg-white/[0.04] text-slate-300' },
  revision: { label: 'En revision', step: 1, className: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
  entrevista: { label: 'Entrevista', step: 2, className: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  oferta: { label: 'Oferta recibida', step: 3, className: 'border-mint/40 bg-mint/10 text-mint' },
  cerrada: { label: 'No seleccionado', step: -1, className: 'border-rose-400/30 bg-rose-400/10 text-rose-300' },
}

export const applicationSteps = ['Enviada', 'En revision', 'Entrevista', 'Oferta']

export const applications = [
  { id: 'app-1', jobTitle: 'Desarrollador Backend Python / Django', company: 'Grupo Andes Digital', category: 'IT & Desarrollo', icon: '💻', pay: 80, appliedAt: '2026-11-12', status: 'entrevista' },
  { id: 'app-2', jobTitle: 'Especialista en Nube AWS', company: 'Nimbus Cloud SAS', category: 'IT & Desarrollo', icon: '☁️', pay: 100, appliedAt: '2026-11-08', status: 'revision' },
  { id: 'app-3', jobTitle: 'Disenador UI/UX Freelance', company: 'Estudio Cafe Creativo', category: 'Diseno', icon: '🎨', pay: 70, appliedAt: '2026-11-15', status: 'enviada' },
  { id: 'app-4', jobTitle: 'Analista de Ciberseguridad', company: 'Segura TI', category: 'IT & Desarrollo', icon: '🔒', pay: 85, appliedAt: '2026-10-21', status: 'oferta' },
  { id: 'app-5', jobTitle: 'Especialista en SEO', company: 'Marketing Caribe', category: 'Marketing', icon: '📣', pay: 55, appliedAt: '2026-10-02', status: 'cerrada' },
]
