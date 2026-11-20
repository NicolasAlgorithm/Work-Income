import Icon from '../../components/Icon.jsx'
import { languageLevels } from '../data/profile.js'
import { formatPeriod } from '../utils.js'

function SectionCard({ title, action, children, id }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel p-6 md:p-8" aria-labelledby={id}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-white" id={id}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function EmptyHint({ children }) {
  return <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-500">{children}</p>
}

const sectionConfig = {
  experience: { title: 'Experiencia', icon: 'briefcase', addLabel: 'Agregar experiencia', empty: 'Aun no agregas experiencia laboral. Incluye empleos, practicas o proyectos freelance.' },
  education: { title: 'Educacion', icon: 'graduation', addLabel: 'Agregar formacion', empty: 'Aun no agregas formacion academica.' },
}

function EntryList({ section, entries, onAdd, onEdit, onDelete }) {
  const config = sectionConfig[section]

  return (
    <SectionCard
      title={config.title}
      id={`${section}-heading`}
      action={<button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => onAdd(section)}><Icon name="plus" />{config.addLabel}</button>}
    >
      {entries.length === 0 ? <EmptyHint>{config.empty}</EmptyHint> : (
        <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-white/10">
          {entries.map((entry) => (
            <li className="relative flex gap-4" key={entry.id}>
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink text-mint"><Icon name={config.icon} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">{entry.title}</h3>
                    <p className="text-sm text-slate-300">{entry.organization}{entry.location && <span className="text-slate-500"> · {entry.location}</span>}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatPeriod(entry.start, entry.end)}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white" type="button" onClick={() => onEdit(section, entry)} aria-label={`Editar ${entry.title}`}><Icon name="pencil" /></button>
                    <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300" type="button" onClick={() => onDelete(section, entry)} aria-label={`Eliminar ${entry.title}`}><Icon name="trash" /></button>
                  </div>
                </div>
                {entry.description && <p className="mt-3 text-sm leading-6 text-slate-400">{entry.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </SectionCard>
  )
}

function ProfileOverview({ profile, onAddEntry, onEditEntry, onDeleteEntry }) {
  const editLink = <a className="text-xs font-semibold text-mint hover:text-white" href="#/perfil/editar">Editar</a>

  return (
    <div className="space-y-6">
      <SectionCard title="Sobre mi" id="about-heading" action={editLink}>
        {profile.about
          ? <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{profile.about}</p>
          : <EmptyHint>Escribe una breve presentacion: quien eres, que haces y que tipo de trabajo buscas.</EmptyHint>}
      </SectionCard>

      <SectionCard title="Habilidades" id="skills-heading" action={editLink}>
        {profile.skills.length ? (
          <ul className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => <li className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint" key={skill}>{skill}</li>)}
          </ul>
        ) : <EmptyHint>Agrega tus habilidades para recibir recomendaciones de trabajos y cursos.</EmptyHint>}
      </SectionCard>

      <EntryList section="experience" entries={profile.experience} onAdd={onAddEntry} onEdit={onEditEntry} onDelete={onDeleteEntry} />
      <EntryList section="education" entries={profile.education} onAdd={onAddEntry} onEdit={onEditEntry} onDelete={onDeleteEntry} />

      <SectionCard title="Idiomas" id="languages-heading" action={editLink}>
        {profile.languages.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.languages.map((language) => {
              const levelIndex = languageLevels.indexOf(language.level)
              return (
                <li className="rounded-xl border border-white/10 bg-white/[0.03] p-4" key={language.name}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">{language.name}</span>
                    <span className="text-xs font-semibold text-mint">{language.level}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
                    {languageLevels.map((level, index) => <span className={`h-1.5 rounded-full ${index <= levelIndex ? 'bg-mint' : 'bg-white/10'}`} key={level} />)}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : <EmptyHint>Indica los idiomas que hablas y tu nivel en cada uno.</EmptyHint>}
      </SectionCard>
    </div>
  )
}

export default ProfileOverview
