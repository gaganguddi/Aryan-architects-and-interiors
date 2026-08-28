import { motion } from 'framer-motion'
import { ClipboardList, PenTool, KeyRound, ShieldCheck } from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: ClipboardList,
    title: 'Consultation',
    copy: 'We meet to discuss goals, requirements, budget, and timeline — until your vision is clearly understood.',
  },
  {
    n: '02',
    icon: PenTool,
    title: '2D / 3D Planning',
    copy: 'Space planning, furniture flow, floor layouts, and elevation models. You see the home before a single wall moves.',
  },
  {
    n: '03',
    icon: KeyRound,
    title: 'Execution & Handover',
    copy: 'We coordinate contractors, suppliers, and site work through construction, installation, and a clean handover.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Process</p>
        <h2 className="mt-3 font-serif text-4xl text-teal sm:text-5xl">Three steps. One studio.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-teal/10 bg-mist p-8"
            >
              <p className="font-serif text-5xl text-teal/15">{s.n}</p>
              <s.icon className="mt-2 h-6 w-6 text-gold" />
              <h3 className="mt-3 font-serif text-2xl text-teal">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{s.copy}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-teal px-6 py-6 text-white sm:flex-row sm:items-center sm:px-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-gold" />
            <div>
              <p className="font-serif text-2xl">Warranty you can quote on site</p>
              <p className="text-sm text-white/70">Written into every turnkey interior package.</p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-gold">
            6+4 Years Warranty · Lifetime Hardware Guarantee · 20+ Years SS Durability
          </p>
        </div>
      </div>
    </section>
  )
}
