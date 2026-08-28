import { MessageCircle } from 'lucide-react'

const href =
  "https://wa.me/918310388556?text=Hi%20Aryan%20Architects,%20I'm%20interested%20in%20your%20design%20services."

export default function WhatsAppFloat() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.9)] transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
