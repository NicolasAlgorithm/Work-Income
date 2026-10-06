import { useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('')

  const isLogin = mode === 'login'

  function handleSubmit(event) {
    event.preventDefault()
    setStatus(
      isLogin
        ? 'Listo para conectar con tu cuenta.'
        : 'Tu cuenta esta lista para el siguiente paso.',
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-ink font-sans text-white">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 px-12 py-10 lg:flex xl:px-20">
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-mint/10 blur-3xl" />
          <header className="relative flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl font-bold text-ink">W</span>
            <span className="font-display text-xl font-semibold tracking-tight">Work<span className="text-mint">+</span>Income</span>
          </header>

          <div className="relative max-w-xl py-14">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-mint">Talento que se mueve</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight xl:text-7xl">Impulsa tu talento. <span className="text-white/45">Asegura tus ingresos.</span></h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-slate-300">Una red profesional para aprender, encontrar oportunidades y construir una carrera con respaldo.</p>
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {['Networking y soporte', 'Aprendizaje practico', 'Pago seguro'].map((item, index) => (
                <div className="border-t border-white/15 pt-4" key={item}>
                  <span className="text-sm text-mint">0{index + 1}</span>
                  <p className="mt-2 text-sm font-semibold leading-5 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-slate-500">Construido para profesionales en Colombia</p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint font-display text-xl font-bold text-ink">W</span>
              <span className="font-display text-xl font-semibold">Work<span className="text-mint">+</span>Income</span>
            </div>
            <div className="mb-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">Tu siguiente oportunidad</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}</h2>
              <p className="mt-3 text-slate-400">{isLogin ? 'Retoma tu camino profesional.' : 'Empieza a construir tu futuro profesional.'}</p>
            </div>

            <div className="mb-8 grid grid-cols-2 border-b border-white/15" role="tablist" aria-label="Tipo de acceso">
              <button className={`border-b-2 pb-3 text-sm font-bold transition-colors ${isLogin ? 'border-mint text-mint' : 'border-transparent text-slate-500 hover:text-white'}`} onClick={() => { setMode('login'); setStatus('') }} role="tab" aria-selected={isLogin}>Iniciar sesion</button>
              <button className={`border-b-2 pb-3 text-sm font-bold transition-colors ${!isLogin ? 'border-mint text-mint' : 'border-transparent text-slate-500 hover:text-white'}`} onClick={() => { setMode('register'); setStatus('') }} role="tab" aria-selected={!isLogin}>Registrarse</button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} aria-label={isLogin ? 'Formulario de inicio de sesion' : 'Formulario de registro'}>
              {!isLogin && <div><label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="name">Nombre completo</label><input className="field" id="name" name="name" placeholder="Tu nombre" required /></div>}
              <div><label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">Correo electronico</label><input className="field" id="email" name="email" type="email" placeholder="tu@correo.com" required /></div>
              <div><div className="mb-2 flex items-center justify-between"><label className="block text-sm font-medium text-slate-300" htmlFor="password">Contrasena</label>{isLogin && <button type="button" className="text-xs font-semibold text-mint hover:text-white" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button>}</div><input className="field" id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Minimo 8 caracteres" minLength="8" required /></div>
              {isLogin && <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-400"><input className="accent-mint" type="checkbox" /> Recordarme</label><button type="button" className="font-semibold text-mint hover:text-white">Olvide mi contrasena</button></div>}
              <button className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-mint px-5 py-4 font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-mint/25" type="submit">{isLogin ? 'Iniciar sesion' : 'Crear cuenta'} <span className="text-lg transition-transform group-hover:translate-x-1">-&gt;</span></button>
              {status && <p className="rounded-lg border border-mint/30 bg-mint/10 p-3 text-center text-sm text-mint" role="status">{status}</p>}
            </form>
            <p className="mt-8 text-center text-xs leading-5 text-slate-500">Al continuar aceptas nuestros terminos de uso y politica de privacidad.</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
