import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function TiltCard({ children, className = '', intensity = 10 }) {
  const ref = useRef(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rotateX.set((0.5 - py) * intensity)
    rotateY.set((px - 0.5) * intensity)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  function onLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
      />
    </motion.div>
  )
}
