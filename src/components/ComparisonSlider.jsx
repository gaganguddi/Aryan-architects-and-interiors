import { useEffect, useRef, useState } from 'react'

export default function ComparisonSlider({
  before,
  after,
  beforeLabel = '3D Design',
  afterLabel = 'Site Executed',
}) {
  const [pos, setPos] = useState(52)
  const [width, setWidth] = useState(0)
  const dragging = useRef(false)
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth))
    ro.observe(el)
    setWidth(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  function setFromClientX(clientX) {
    const el = wrap.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const next = ((clientX - r.left) / r.width) * 100
    setPos(Math.min(96, Math.max(4, next)))
  }

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden rounded-3xl bg-teal-deep select-none"
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture?.(e.pointerId)
        setFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return
        setFromClientX(e.clientX)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
    >
      <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
          style={{ width: width ? `${width}px` : '100%' }}
        />
      </div>
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_20px_rgba(217,119,6,0.8)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-teal text-white">
          <span className="text-xs font-semibold">⟷</span>
        </div>
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-teal/80 px-3 py-1 text-[11px] uppercase tracking-wider text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-gold/90 px-3 py-1 text-[11px] uppercase tracking-wider text-white">
        {afterLabel}
      </span>
    </div>
  )
}
