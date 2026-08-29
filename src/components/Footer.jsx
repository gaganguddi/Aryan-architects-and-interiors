const phones = [
  { num: '8310388556', href: 'tel:+918310388556' },
  { num: '9380851489', href: 'tel:+919380851489' },
]

export default function Footer() {
  return (
    <footer className="bg-teal-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="" className="h-14 w-14 rounded-full object-cover ring-1 ring-white/25" />
            <div>
              <p className="font-serif text-2xl">Aryan Architects & Interiors</p>
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Bengaluru</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            A Bengaluru architecture and interiors studio for custom 2D/3D elevations, luxury
            residential and commercial interiors, and turnkey execution — with warranty-backed
            kitchens, wardrobes, and stainless steel.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {['Home', 'About', 'Services', 'Portfolio', 'Process', 'Contact'].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {phones.map((p) => (
              <li key={p.num}>
                <a href={p.href} className="hover:text-gold">
                  {p.num}
                </a>
              </li>
            ))}
            <li>
              <a href="tel:+919740848757" className="hover:text-gold">
                9740848757
              </a>
            </li>
            <li>
              <a href="tel:+919164840481" className="hover:text-gold">
                9164840481
              </a>
            </li>
            <li className="pt-2">Bengaluru, Karnataka, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Aryan Architects & Interiors. All rights reserved.
      </div>
    </footer>
  )
}
