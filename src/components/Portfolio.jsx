import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { categories, comparisonSets, projects } from '../data/projectsData'
import ComparisonSlider from './ComparisonSlider'
import Lightbox from './Lightbox'
import TiltCard from './TiltCard'

export default function Portfolio() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(null)
  const [cmp, setCmp] = useState(0)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = cat === 'all' || p.category === cat
      return catOk
    })
  }, [cat])

  return (
    <section id="portfolio" className="bg-mist py-24 texture-grid">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Portfolio</p>
            <h2 className="mt-3 font-serif text-4xl text-teal sm:text-5xl">
              3D concepts and site executions
            </h2>
            <p className="mt-3 max-w-xl text-slate">
              Switch between photoreal design studies and built interiors. Filter by room, then open
              any plate in a full lightbox.
            </p>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase ${
                cat === c.id
                  ? 'bg-gold text-white'
                  : 'border border-teal/15 bg-white text-teal hover:border-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mb-16 overflow-hidden rounded-[2rem] border border-teal/10 bg-white p-4 shadow-[0_30px_80px_-48px_rgba(15,62,70,0.6)] sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-2xl text-teal">Spotlight: 3D vs executed</h3>
            <div className="flex gap-2">
              {comparisonSets.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCmp(i)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    cmp === i ? 'bg-teal text-white' : 'bg-mist text-slate'
                  }`}
                >
                  {s.title.split('—')[0]}
                </button>
              ))}
            </div>
          </div>
          <ComparisonSlider
            before={comparisonSets[cmp].before}
            after={comparisonSets[cmp].after}
            beforeLabel={comparisonSets[cmp].beforeLabel}
            afterLabel={comparisonSets[cmp].afterLabel}
          />
          <p className="mt-3 text-sm text-slate">{comparisonSets[cmp].title}. Drag the handle to compare.</p>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.button
                layout
                key={p.id}
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                onClick={() => setActive(p)}
                className="text-left"
              >
                <TiltCard intensity={8}>
                  <article className="overflow-hidden rounded-3xl border border-teal/10 bg-white shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                        {p.type}
                      </p>
                      <h3 className="mt-1 font-serif text-xl text-teal">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate">{p.description}</p>
                    </div>
                  </article>
                </TiltCard>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
