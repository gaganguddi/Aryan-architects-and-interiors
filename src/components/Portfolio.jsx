import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { Search } from 'lucide-react'
import { categories, projects } from '../data/projectsData'
import ComparisonSlider from './ComparisonSlider'
import Lightbox from './Lightbox'

const shuffleArray = (array) => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

const categoryOrder = ['living', 'kitchen', 'bedroom', 'design', 'theatre']

export default function Portfolio() {
  const [cat, setCat] = useState('living')
  const [active, setActive] = useState(null)
  const [cmp, setCmp] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const shuffledProjects = useMemo(() => {
    const groups = {}
    projects.forEach((p) => {
      if (!groups[p.category]) groups[p.category] = []
      groups[p.category].push(p)
    })
    Object.keys(groups).forEach((c) => {
      groups[c] = shuffleArray(groups[c])
    })
    const recombined = []
    categoryOrder.forEach((c) => {
      if (groups[c]) recombined.push(...groups[c])
    })
    Object.keys(groups).forEach((c) => {
      if (!categoryOrder.includes(c)) recombined.push(...groups[c])
    })
    return recombined
  }, [])

  const fuse = useMemo(() => {
    return new Fuse(shuffledProjects, {
      keys: ['title', 'description', 'specs', 'category'],
      threshold: 0.4,
      ignoreLocation: true,
    })
  }, [shuffledProjects])

  const filtered = useMemo(() => {
    let result = shuffledProjects
    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((res) => res.item)
    }
    return result.filter((p) => {
      if (cat === 'all') return true
      if (cat === 'design') return p.category === 'design'
      if (cat === 'theatre') return p.category === 'theatre'
      return p.category === cat
    })
  }, [cat, searchQuery, shuffledProjects, fuse])

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
          <div className="relative w-full shrink-0 md:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal/40" />
            <input
              type="text"
              placeholder="Search 'kitchen', 'green', 'marble'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-teal/15 bg-white py-3 pl-11 pr-4 text-sm text-teal shadow-sm outline-none transition-colors placeholder:text-teal/40 focus:border-gold"
            />
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

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.button
                layout
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                onClick={() => setActive(p)}
                className="text-left"
              >
                <article className="overflow-hidden rounded-3xl border border-teal/10 bg-white shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-xl text-teal">{p.title}</h3>
                  </div>
                </article>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
