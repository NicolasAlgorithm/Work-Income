import { useMemo, useState } from 'react'
import './App.css'

const jobListings = [
  { id: 1, title: 'Desarrollador Backend Python / Django', description: 'Buscamos desarrollador para proyecto de 6 meses.', pay: 80, category: 'IT & Desarrollo', icon: '💻' },
  { id: 2, title: 'Asistente Virtual Ejecutivo', description: 'Gestion de agenda, correo y operaciones diarias.', pay: 35, category: 'Administracion', icon: '📁' },
  { id: 3, title: 'Analista Contable Senior', description: 'Auditoria financiera y preparacion de reportes.', pay: 90, category: 'Contabilidad', icon: '📈' },
  { id: 4, title: 'Disenador UI/UX Freelance', description: 'Rediseno de una plataforma movil para usuarios colombianos.', pay: 70, category: 'Diseno', icon: '🎨' },
  { id: 5, title: 'Especialista en SEO', description: 'Optimizacion de contenido y crecimiento organico.', pay: 55, category: 'Marketing', icon: '📣' },
  { id: 6, title: 'Especialista en Nube AWS', description: 'Migracion de infraestructura y monitoreo cloud.', pay: 100, category: 'IT & Desarrollo', icon: '☁️' },
  { id: 7, title: 'Recepcionista Bilingue', description: 'Atencion a clientes internacionales y soporte remoto.', pay: 30, category: 'Administracion', icon: '🎧' },
  { id: 8, title: 'Asistente Contable', description: 'Registro de transacciones y conciliaciones mensuales.', pay: 40, category: 'Contabilidad', icon: '🧮' },
  { id: 9, title: 'Analista de Ciberseguridad', description: 'Monitoreo de amenazas y respuesta a incidentes.', pay: 85, category: 'IT & Desarrollo', icon: '🔒' },
]

const navItems = ['Trabajos', 'Cursos', 'Perfil', 'Configuracion']

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [maxPay, setMaxPay] = useState(100)
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const filteredJobs = useMemo(() => jobListings.filter((job) => {
    const matchesSearch = `${job.title} ${job.description}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || job.category === selectedCategory
    return matchesSearch && matchesCategory && job.pay <= maxPay
  }), [maxPay, searchTerm, selectedCategory])

  return (
    <main className="min-h-screen bg-ink font-sans text-slate-300">
      <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-2xl font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl text-ink">W</span>
            <span>Work<span className="text-mint">+</span>Income</span>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm font-semibold" aria-label="Navegacion principal">
            {navItems.map((item, index) => <a className={index === 0 ? 'border-b-2 border-mint pb-1 text-white' : 'transition-colors hover:text-white'} href="#" key={item}>{item}</a>)}
          </nav>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Oportunidades para crecer</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Encuentra tu proximo trabajo</h1>
          </div>
          <label className="w-full md:max-w-xs"><span className="sr-only">Buscar trabajos</span><input className="field" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por cargo o habilidad" /></label>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="h-fit rounded-2xl border border-white/10 bg-panel p-6 lg:col-span-1">
            <div className="mb-6 flex items-center justify-between"><h2 className="font-display text-xl font-semibold text-white">Filtros</h2><button className="text-xs font-semibold text-mint hover:text-white" onClick={() => { setMaxPay(100); setSelectedCategory('Todas') }}>Limpiar</button></div>
            <fieldset className="mb-6"><legend className="mb-3 font-semibold text-white">Modalidad</legend><div className="space-y-3 text-sm"><label className="flex items-center gap-2"><input className="accent-mint" type="checkbox" defaultChecked /> Remoto</label><label className="flex items-center gap-2"><input className="accent-mint" type="checkbox" defaultChecked /> Hibrido</label><label className="flex items-center gap-2"><input className="accent-mint" type="checkbox" /> Presencial</label></div></fieldset>
            <div className="mb-6 border-t border-white/10 pt-5"><label className="mb-3 block font-semibold text-white" htmlFor="category">Categoria</label><select className="field py-2.5" id="category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}><option>Todas</option><option>IT & Desarrollo</option><option>Administracion</option><option>Contabilidad</option><option>Diseno</option><option>Marketing</option></select></div>
            <div className="border-t border-white/10 pt-5"><div className="mb-3 flex justify-between font-semibold text-white"><span>Pago maximo</span><span className="text-sm text-mint">{maxPay}k COP / hora</span></div><input className="w-full accent-mint" type="range" min="30" max="100" step="5" value={maxPay} onChange={(event) => setMaxPay(Number(event.target.value))} /><div className="mt-2 flex justify-between text-xs text-slate-500"><span>30k COP</span><span>100k COP</span></div></div>
          </aside>

          <section className="lg:col-span-3" aria-labelledby="jobs-heading">
            <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl font-semibold text-white" id="jobs-heading">Trabajos disponibles</h2><span className="text-sm text-slate-500">{filteredJobs.length} resultados</span></div>
            {filteredJobs.length > 0 ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredJobs.map((job) => <article className="flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-panel p-5 shadow-lg transition hover:-translate-y-1 hover:border-mint/60" key={job.id}><div><div className="mb-4 text-3xl" aria-hidden="true">{job.icon}</div><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mint">{job.category}</p><h3 className="font-display text-lg font-semibold leading-tight text-white">{job.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{job.description}</p></div><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm font-semibold text-amber-400">{job.pay}k COP / hora</span><span className="text-lg text-mint" aria-hidden="true">-&gt;</span></div></article>)}</div> : <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center"><p className="font-semibold text-white">No encontramos trabajos con esos filtros.</p><p className="mt-2 text-sm text-slate-500">Prueba con otra categoria o aumenta el pago maximo.</p></div>}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
