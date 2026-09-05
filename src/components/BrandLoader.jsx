import { useEffect, useState } from 'react'

export default function BrandLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const removeTimer = window.setTimeout(() => setIsVisible(false), 4700)

    return () => window.clearTimeout(removeTimer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="brand-loader"
      role="status"
      aria-label="Loading Aryan Architects and Interiors"
    >
      <div className="brand-loader__content">
        <div className="brand-loader__logo-wrapper">
          <div className="brand-loader__ring" aria-hidden="true" />
          <div className="brand-loader__circle" aria-hidden="true" />
          <img
            src="/loader-logo.png"
            alt="Aryan Architects and Interiors"
            className="brand-loader__logo"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="brand-loader__name">ARYAN ARCHITECTS &amp; INTERIORS</div>
        <div className="brand-loader__rule" aria-hidden="true" />
      </div>
    </div>
  )
}