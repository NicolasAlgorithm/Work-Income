import Icon from '../../components/Icon.jsx'
import { availabilityOptions } from '../data/profile.js'
import { AVATAR_INPUT_ID, formatMonth, getInitials } from '../utils.js'

function ProfileHeader({ profile, stats, onAvatarSelect, onAvatarRemove, onShare }) {
  const availability = availabilityOptions.find((option) => option.value === profile.availability) ?? availabilityOptions[0]

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-panel" aria-labelledby="profile-name">
      <div className="relative h-28 bg-gradient-to-r from-mint/30 via-mint/10 to-transparent md:h-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:22px_22px]" aria-hidden="true" />
      </div>

      <div className="px-5 pb-6 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="relative -mt-14 w-fit md:-mt-16">
              {profile.avatar
                ? <img className="h-28 w-28 rounded-2xl border-4 border-panel object-cover md:h-32 md:w-32" src={profile.avatar} alt={`Foto de perfil de ${profile.name}`} />
                : <span className="grid h-28 w-28 place-items-center rounded-2xl border-4 border-panel bg-mint font-display text-4xl font-semibold text-ink md:h-32 md:w-32" aria-hidden="true">{getInitials(profile.name)}</span>}
              <label className="absolute -bottom-2 -right-2 grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-white/15 bg-ink text-white shadow-lg transition hover:border-mint hover:text-mint focus-within:ring-4 focus-within:ring-mint/20" title="Cambiar foto">
                <Icon name="camera" />
                <span className="sr-only">Cambiar foto de perfil</span>
                <input className="sr-only" id={AVATAR_INPUT_ID} type="file" accept="image/png,image/jpeg,image/webp" onChange={onAvatarSelect} />
              </label>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl" id="profile-name">{profile.name}</h1>
                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${availability.className}`}>{availability.label}</span>
              </div>
              <p className="mt-1 text-sm text-slate-300 md:text-base">{profile.headline || 'Agrega un titular profesional'}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                {profile.location && <span className="inline-flex items-center gap-1.5"><Icon name="mapPin" className="h-3.5 w-3.5 text-mint" />{profile.location}</span>}
                <span className="inline-flex items-center gap-1.5"><Icon name="calendar" className="h-3.5 w-3.5 text-mint" />Miembro desde {formatMonth(profile.memberSince)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="btn-primary flex-1 sm:flex-none" href="#/perfil/editar"><Icon name="pencil" />Editar perfil</a>
            <button className="btn-secondary flex-1 sm:flex-none" type="button" onClick={onShare}><Icon name="share" />Compartir</button>
          </div>
        </div>

        {profile.avatar && (
          <button className="mt-4 text-xs font-semibold text-slate-500 hover:text-white" type="button" onClick={onAvatarRemove}>Quitar foto</button>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default ProfileHeader
