import { motion } from 'framer-motion'
import { Building2, Palette } from 'lucide-react'
import ServiceCard from './ServiceCard'

const services = [
  {
    icon: Building2,
    title: 'Architecture',
    copy: 'Thoughtful architectural planning that brings together functionality, structure, aesthetics, and precise documentation.',
    points: [
      'Floor plans and space planning',
      '3D renders and front elevations',
      'Structural design and detailing',
      'MEP drawings and coordination',
      'Furniture layouts',
      '3D modeling and visualization',
    ],
  },
  {
    icon: Palette,
    title: 'Interior Design',
    copy: 'Complete interior solutions designed around your lifestyle, combining practical planning with refined materials and details.',
    points: [
      'Modular kitchens and wardrobes',
      'Renovation and remodeling',
      'Landscaping and outdoor spaces',
      'False ceilings and lighting design',
      'Custom furniture and storage',
      'Material, color and finish selection',
    ],
  },
  {
    icon: Building2,
    title: 'Construction',
    copy: 'End-to-end construction management focused on quality workmanship, reliable coordination, transparent costs, and timely completion.',
    points: [
      'House construction with approvals',
      'Turnkey construction projects',
      'Site supervision and quality checks',
      'On-time project delivery',
      'Material and vendor coordination',
      'Transparent budget and cost planning',
    ],
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
            spaces that feel considered, functional, and built to last.
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
