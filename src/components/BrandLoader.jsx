import { useEffect, useState } from 'react'

const companyName = 'Aryan Architects & Interiors'

export default function BrandLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsFadingOut(true), 1400)
    const exitTimer = window.setTimeout(() => setIsExiting(true), 1800)
    const removeTimer = window.setTimeout(() => setIsVisible(false), 2700)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`brand-loader ${isFadingOut ? 'brand-loader--fading' : ''} ${
        isExiting ? 'brand-loader--exiting' : ''
      }`}
      role="status"
      aria-label="Loading Aryan Architects and Interiors"
    >
      <div className="brand-loader__curtain brand-loader__curtain--top" aria-hidden="true" />
      <div className="brand-loader__curtain brand-loader__curtain--bottom" aria-hidden="true" />
      <div className="brand-loader__identity">
        <img
          src="/logo.jpg"
          alt=""
          className="brand-loader__logo"
          loading="eager"
          fetchPriority="high"
        />
        <div className="brand-loader__rule" aria-hidden="true" />
        <p className="brand-loader__name" aria-label={companyName}>
          {Array.from(companyName).map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="brand-loader__letter"
              aria-hidden="true"
              style={{ '--letter-index': index }}
            >
              {letter === ' ' ? '\u00a0' : letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}