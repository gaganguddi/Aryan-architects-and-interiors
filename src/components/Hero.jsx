import { motion } from 'framer-motion'
import { ArrowRight, Box, Building2, Hammer } from 'lucide-react'
import TiltCard from './TiltCard'

const stats = [
  { icon: Box, label: '100% Custom 3D & 2D Floor Plans' },
  { icon: Building2, label: 'G+1, G+2, G+3 Elevation Specialists' },
  { icon: Hammer, label: 'Turnkey Execution & Fitouts' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-teal-deep text-white">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/projects/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/45 via-teal-deep/20 to-teal/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,119,6,0.05),transparent_42%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-16 pt-28 lg:px-8 lg:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="max-w-4xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
        >
          Transforming Spaces Into Iconic Living Experiences
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Custom architectural 2D/3D elevations, luxury residential and commercial interiors,
          and turnkey fitouts — planned, rendered, and executed by Aryan Architects & Interiors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(217,119,6,1)] transition hover:bg-gold-deep"
          >
            Explore Portfolio <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:border-gold hover:text-gold"
          >
            Request a Quote
          </a>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 + i * 0.08 }}
            >
              <TiltCard className="h-full" intensity={8}>
                <div className="glow-border h-full rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                  <s.icon className="mb-3 h-5 w-5 text-gold" />
                  <p className="text-sm font-medium leading-snug text-white">{s.label}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
