import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon
  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const hasAutoOpened = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const floatDistance = index % 2 === 0 ? 10 : -10
  const floatingY = useTransform(scrollYProgress, [0, 0.5, 1], [floatDistance, 0, -floatDistance])

  useEffect(() => {
    const title = titleRef.current
    const card = cardRef.current
    if (!title || !card) return undefined

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoOpened.current) {
          hasAutoOpened.current = true
          setIsOpen(true)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const cardObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && hasAutoOpened.current) setIsOpen(false)
    })

    titleObserver.observe(title)
    cardObserver.observe(card)

    return () => {
      titleObserver.disconnect()
      cardObserver.disconnect()
    }
  }, [])

  const detailsId = `service-details-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06 }}
      style={prefersReducedMotion ? undefined : { y: floatingY }}
      className="h-full"
    >
      <article className="group flex h-full flex-col rounded-3xl border border-teal/10 bg-mist p-7 shadow-[0_18px_48px_-34px_rgba(15,62,70,0.45)] transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_54px_-32px_rgba(15,62,70,0.5)]">
          <button
            ref={titleRef}
            type="button"
            aria-controls={detailsId}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="mb-5 flex w-full items-center gap-4 text-left"
          >
            <div className="inline-flex w-fit shrink-0 rounded-2xl border border-teal/10 bg-white p-3 text-teal transition duration-300 group-hover:border-gold/50 group-hover:text-gold-deep">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="flex-1 font-serif text-2xl text-teal">{service.title}</h3>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-teal transition-transform duration-300 md:hidden ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            id={detailsId}
            className={`${
              isOpen ? 'max-h-175 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden transition-[max-height,opacity] duration-500 ease-out md:max-h-none md:opacity-100`}
          >
            <p className="mt-3 text-sm leading-relaxed text-slate">{service.copy}</p>
            <ul className="mt-6 space-y-3 border-t border-teal/10 pt-6 text-sm leading-relaxed text-slate">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
      </article>
    </motion.div>
  )
}
