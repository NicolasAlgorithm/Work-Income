const navItems = [
  { key: 'jobs', label: 'Trabajos', href: '#/trabajos' },
  { key: 'courses', label: 'Cursos', href: '#/cursos' },
  { key: 'profile', label: 'Perfil', href: '#/perfil' },
  { key: 'settings', label: 'Configuracion', href: '#/configuracion' },
]

function AppHeader({ active }) {
  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <a className="flex items-center gap-3 text-2xl font-bold text-white" href="#/trabajos">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl text-ink">W</span>
        <span>Work<span className="text-mint">+</span>Income</span>
      </a>
      <nav className="flex flex-wrap gap-5 text-sm font-semibold" aria-label="Navegacion principal">
        {navItems.map((item) => {
          if (!item.href) {
            return <span className="cursor-not-allowed text-slate-500" aria-disabled="true" title="Proximamente" key={item.key}>{item.label}</span>
          }
          const isActive = item.key === active
          return (
            <a
              className={isActive ? 'border-b-2 border-mint pb-1 text-white' : 'transition-colors hover:text-white'}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              key={item.key}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}

export default AppHeader
