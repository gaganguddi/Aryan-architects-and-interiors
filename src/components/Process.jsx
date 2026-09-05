import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Building2, ClipboardList, KeyRound, PenTool, ShieldCheck } from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: ClipboardList,
    title: 'Consultation',
    copy: 'We begin by understanding your vision, requirements, lifestyle, budget, and timeline to create a clear direction for your project.',
  },
  {
    n: '02',
    icon: PenTool,
    title: 'Design & Planning',
    copy: 'We develop thoughtful layouts, detailed designs, material concepts, and visual representations to help you clearly understand your space before execution begins.',
  },
  {
    n: '03',
    icon: Building2,
    title: 'Execution',
    copy: 'Once the design is approved, we coordinate materials, vendors, contractors, and site activities to bring the vision to life with precision and attention to detail.',
  },
  {
    n: '04',
    icon: ShieldCheck,
    title: 'Quality Check',
    copy: 'Every stage is carefully reviewed for workmanship, materials, measurements, finishes, and design accuracy to maintain our standards of quality.',
  },
  {
    n: '05',
    icon: KeyRound,
    title: 'Final Handover',
    copy: 'We complete the finishing touches, conduct a final walkthrough, and hand over a ready-to-use space with attention to every detail.',
  },
]

function FloatingProcessCard({ step, index }) {
  const cardRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const floatDistance = index % 2 === 0 ? 10 : -10
  const floatingY = useTransform(scrollYProgress, [0, 0.5, 1], [floatDistance, 0, -floatDistance])

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={prefersReducedMotion ? undefined : { y: floatingY }}
      className="relative h-full overflow-hidden rounded-3xl border border-teal/10 bg-mist p-8 shadow-[0_18px_48px_-34px_rgba(15,62,70,0.35)] transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_54px_-32px_rgba(15,62,70,0.45)]"
    >
      <p className="font-serif text-5xl text-teal/15">{step.n}</p>
      <step.icon className="mt-2 h-6 w-6 text-gold" />
      <h3 className="mt-3 font-serif text-2xl text-teal">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate">{step.copy}</p>
    </motion.article>
  )
}

export default function Process() {
  return (
    <section id="process" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Process</p>
        <h2 className="mt-3 font-serif text-4xl text-teal sm:text-5xl">
          Five steps. One seamless journey.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <FloatingProcessCard key={step.n} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
