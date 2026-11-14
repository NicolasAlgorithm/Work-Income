import { useState } from 'react'

const features = [
  { icon: '◌', title: 'Networking profesional', description: 'Acompañamiento contextual y red de contactos para tu éxito.', featured: true },
  { icon: '↗', title: 'Educación continua', description: 'Aprende nuevas habilidades para destacar.' },
  { icon: '+', title: 'Inclusión financiera', description: 'Ingresos seguros y accesibilidad para todos.' },
]

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-ink px-4 py-6 font-sans text-slate-300 sm:px-8 sm:py-10">
      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1180px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151a1d] shadow-2xl shadow-slate-900/30 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_15%,rgba(0,229,153,0.2),transparent_18%),linear-gradient(125deg,transparent_38%,rgba(255,255,255,0.08)_38.1%,transparent_38.5%),linear-gradient(35deg,transparent_68%,rgba(0,229,153,0.12)_68.1%,transparent_68.5%)]" />

        <section className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-14">
          <header className="flex items-center gap-3 text-2xl font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl text-ink">W</span>
            <span>Work<span className="text-mint">+</span>Income</span>
          </header>

          <div className="py-12 lg:py-8">
            <p className="mb-4 max-w-md font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Impulsa tu talento, asegura tus ingresos en Colombia.</p>
            <p className="max-w-md text-sm leading-6 text-slate-400">Conecta con oportunidades que te ayudan a crecer y construir un futuro con más posibilidades.</p>

            <div className="mt-8 grid max-w-lg gap-4">
              {features.map(({ icon, title, description, featured }) => (
                <article className={`rounded-2xl border p-5 shadow-lg transition hover:border-mint/40 hover:bg-white/[0.08] ${featured ? 'border-mint/50 bg-white/[0.06] shadow-mint/5' : 'border-white/15 bg-white/[0.05]'}`} key={title}>
                  <div className="mb-3 flex items-center gap-3 text-mint"><span className="text-2xl" aria-hidden="true">{icon}</span><h2 className="font-display text-lg font-semibold text-white">{title}</h2></div>
                  <p className="pl-9 text-sm leading-5 text-slate-400">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">Encuentra trabajo. Aprende. Crece.</p>
        </section>

        <section className="relative flex items-center border-t border-white/10 bg-black/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex border-b border-white/10 text-sm font-semibold">
              <span className="relative flex-1 pb-4 text-center text-white after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-mint">Iniciar sesión</span>
              <a className="flex-1 pb-4 text-center text-slate-500 transition hover:text-white" href="#register">Registrarse</a>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Tu siguiente oportunidad</p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white">Bienvenido</h1>
              <p className="mt-3 text-sm text-slate-400">Accede a tu espacio de Work+Income.</p>
            </div>

            <form className="space-y-7">
              <label htmlFor="email">
                <span className="sr-only">Correo electronico</span>
                <span className="relative block">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500" aria-hidden="true">@</span>
                  <input className="field pl-11" id="email" name="email" type="email" placeholder="Correo electrónico" autoComplete="email" required />
                </span>
              </label>

              <label htmlFor="password">
                <span className="sr-only">Contrasena</span>
                <span className="relative block">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500" aria-hidden="true">#</span>
                  <input className="field pl-11 pr-24" id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" autoComplete="current-password" required />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-mint hover:text-white" type="button" onClick={() => setShowPassword((visible) => !visible)}>
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </span>
              </label>

              <div className="text-right"><a className="text-sm font-semibold text-mint hover:text-white" href="#forgot-password">Olvide mi contrasena</a></div>
              <button className="w-full rounded-xl bg-mint px-4 py-3.5 font-bold text-ink shadow-lg shadow-mint/20 transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-mint/20" type="submit">Iniciar sesión</button>
            </form>

            <div className="my-7 flex items-center gap-4 text-xs text-slate-500"><span className="h-px flex-1 bg-white/10" />O continúa con<span className="h-px flex-1 bg-white/10" /></div>
            <div className="flex justify-center gap-5 text-xl font-bold text-slate-500"><span aria-label="Google">G</span><span aria-label="LinkedIn">in</span><span aria-label="GitHub">◉</span></div>
            <p className="mt-7 text-center text-sm text-slate-400">Aun no tienes cuenta? <a className="font-semibold text-mint hover:text-white" href="#register">Registrate</a></p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login