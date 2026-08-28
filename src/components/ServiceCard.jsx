import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06 }}
      className={index === 4 ? 'lg:col-span-2' : ''}
    >
      <TiltCard className="h-full" intensity={9}>
        <article className="group h-full rounded-3xl border border-teal/10 bg-mist p-7 shadow-[0_24px_60px_-36px_rgba(15,62,70,0.45)] transition hover:border-gold/40">
          <div className="mb-5 inline-flex rounded-2xl bg-teal p-3 text-gold">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-serif text-2xl text-teal">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate">{service.copy}</p>
        </article>
      </TiltCard>
    </motion.div>
  )
}
