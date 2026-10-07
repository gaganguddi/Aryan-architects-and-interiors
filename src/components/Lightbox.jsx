import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useState } from 'react'

const WA =
  'https://wa.me/919380851489?text='

export default function Lightbox({ project, onClose }) {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  useEffect(() => {
    setZoom(1)
  }, [project?.id])

  const text = encodeURIComponent(
    `Hi Aryan Architects, I'm interested in your design services. I'd like to enquire about: ${project?.title || ''}.`,
  )

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-teal-deep/88 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative flex max-h-[46vh] w-full items-center justify-center overflow-auto bg-teal-deep md:max-h-[92vh]">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain origin-center transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            <div className="flex flex-col p-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold-deep">
                {project.type} · {project.category}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-teal">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.specs.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-teal/15 bg-mist px-3 py-1 text-xs text-teal"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.4, z + 0.3))}
                  className="inline-flex items-center gap-1 rounded-full border border-teal/20 px-3 py-2 text-xs font-medium text-teal"
                >
                  <ZoomIn className="h-4 w-4" /> Zoom
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, z - 0.3))}
                  className="inline-flex items-center gap-1 rounded-full border border-teal/20 px-3 py-2 text-xs font-medium text-teal"
                >
                  <ZoomOut className="h-4 w-4" /> Out
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const img = project.image
                    window.open(img, '_blank')
                  }}
                  className="rounded-full border border-teal/20 px-3 py-2 text-xs font-medium text-teal"
                >
                  Full screen
                </button>
              </div>
              <a
                href={`${WA}${text}`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-white hover:bg-gold-deep"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire About This Design
              </a>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-teal shadow"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
