import { MessageCircle } from 'lucide-react'

const href =
  "https://wa.me/919380851489?text=Hi%20Aryan%20Architects,%20I'm%20interested%20in%20your%20design%20services."

export default function WhatsAppFloat() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed right-6 bottom-24 z-50 flex items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.9)] transition-all duration-300 hover:px-4"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:ml-2 group-hover:max-w-[100px]">
        WhatsApp
      </span>
    </a>
  )
}
