import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-teal py-24 text-white">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.32em] text-gold">About us</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">A studio for spaces that change how you live</h2>
          <p className="mt-5 text-white/75 leading-relaxed">
            Welcome to our interior design studio, where creativity and innovation meet to transform
            spaces into stunning works of art. With a team of designers and architects, we create
            unique environments that reflect each client’s vision — from a single room to a complete
            renovation, residential to commercial.
          </p>
          <p className="mt-4 text-white/75 leading-relaxed">
            Our vision is to create spaces that inspire and transform lives. The environments we
            inhabit shape mood, productivity, and well-being. We blend creativity, innovation, and
            practicality — then we build it.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {[
            {
              k: 'Experience',
              v: 'Years of residential and commercial work across Bengaluru, honing planning, detailing, and site execution.',
            },
            {
              k: 'Mission',
              v: 'Captivating, functional environments that reflect personality — without sacrificing how a home actually works.',
            },
            {
              k: 'Method',
              v: 'Consultation, 2D/3D planning, then construction, installation, and handover with warranty-backed hardware.',
            },
            {
              k: 'Promise',
              v: '6+4 years warranty, lifetime hardware, 20+ years on stainless steel — because luxury should last.',
            },
          ].map((card) => (
            <div
              key={card.k}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur"
            >
              <p className="text-gold text-sm font-semibold tracking-wide">{card.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{card.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
