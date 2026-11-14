import { useState } from 'react'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-ink font-sans text-slate-300">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between px-5 py-6 md:px-8 md:py-8">
        <header className="flex items-center gap-3 text-2xl font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl text-ink">W</span>
          <span>Work<span className="text-mint">+</span>Income</span>
        </header>

        <section className="mx-auto w-full max-w-md py-12">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Tu siguiente oportunidad</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white">Inicia sesion</h1>
            <p className="mt-3 text-sm text-slate-400">Accede a tu espacio de Work+Income.</p>
          </div>

          <form className="rounded-2xl border border-white/10 bg-panel p-6 shadow-lg md:p-8">
            <label className="mb-5 block text-sm font-semibold text-white" htmlFor="email">
              Correo electronico
              <input className="field mt-2" id="email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required />
            </label>

            <label className="block text-sm font-semibold text-white" htmlFor="password">
              Contrasena
              <span className="relative mt-2 block">
                <input className="field pr-24" id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Tu contrasena" autoComplete="current-password" required />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-mint hover:text-white" type="button" onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </span>
            </label>

            <div className="mt-3 text-right"><a className="text-sm font-semibold text-mint hover:text-white" href="#forgot-password">Olvide mi contrasena</a></div>
            <button className="mt-7 w-full rounded-xl bg-mint px-4 py-3.5 font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-mint/20" type="submit">Entrar</button>
            <p className="mt-6 text-center text-sm text-slate-400">Aun no tienes cuenta? <a className="font-semibold text-mint hover:text-white" href="#register">Registrate</a></p>
          </form>
        </section>

        <p className="text-center text-xs text-slate-500">Encuentra trabajo. Aprende. Crece.</p>
      </div>
    </main>
  )
}

export default Login