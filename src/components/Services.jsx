import { motion } from 'framer-motion'
import { Box, ChefHat, BedDouble, Sofa, Sparkles } from 'lucide-react'
import ServiceCard from './ServiceCard'

const services = [
  {
    icon: Box,
    title: 'Architectural 2D/3D Planning',
    copy: 'Precise G+1 to G+3 floor layouts, structural coordination, and photoreal elevation models for residences and commercial volumes.',
  },
  {
    icon: ChefHat,
    title: 'Modular Kitchens',
    copy: 'Minimalist ergonomic layouts, premium acrylic finishes, and storage that actually survives a Bengaluru family kitchen.',
  },
  {
    icon: BedDouble,
    title: 'Master Bedroom & Wardrobes',
    copy: 'Luxury panelling, ambient LED feature walls, and sleek sliding or hinged closets with lifetime-grade hardware.',
  },
  {
    icon: Sofa,
    title: 'Living, TV Units & Ceilings',
    copy: 'Contemporary partitions, CNC jali patterns, multi-layer false ceilings, and TV walls that become the room’s architecture.',
  },
  {
    icon: Sparkles,
    title: 'Specialty Spaces',
    copy: 'Acoustic home theatres, Japanese/Zen balcony gardens, luxury bathroom suites, and puja or foyer units designed as rituals.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Services</p>
          <h2 className="mt-3 font-serif text-4xl text-teal sm:text-5xl">
            Architecture to interiors, as one studio
          </h2>
          <p className="mt-4 text-slate">
            From the first 2D plan to the last hardware click — we design, visualise, and execute
            spaces that feel inevitable.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
