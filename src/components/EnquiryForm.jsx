import { useState } from 'react'
import { Send, Copy, Check } from 'lucide-react'

const WA_BASE = 'https://wa.me/918310388556?text='

const empty = {
  name: '',
  phone: '',
  service: 'Both',
  property: '3BHK',
  budget: '₹15–25L',
  message: '',
}

export default function EnquiryForm() {
  const [form, setForm] = useState(empty)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  function payload() {
    return [
      'New enquiry — Aryan Architects & Interiors',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Property: ${form.property}`,
      `Budget: ${form.budget}`,
      `Message: ${form.message || '—'}`,
    ].join('\n')
  }

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function sendWhatsApp(e) {
    e.preventDefault()
    setSent(true)
    const url = `${WA_BASE}${encodeURIComponent(payload())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function copyPayload() {
    await navigator.clipboard.writeText(payload())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const field =
    'mt-1.5 w-full rounded-xl border border-teal/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-gold'

  return (
    <section id="contact" className="bg-mist py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Enquiry</p>
          <h2 className="mt-3 font-serif text-4xl text-teal sm:text-5xl">Book a consultation</h2>
          <p className="mt-4 text-slate">
            Tell us the brief. We will reply with a planning slot. Prefer WhatsApp? The form opens a
            pre-filled chat with Rudra’s studio line.
          </p>
          <div className="mt-8 space-y-3 text-sm text-teal">
            <a className="block hover:text-gold" href="tel:+918310388556">
              +91 83103 88556
            </a>
            <a className="block hover:text-gold" href="tel:+919380851489">
              +91 93808 51489 · Rudra
            </a>
            <a className="block hover:text-gold" href="tel:+919740848757">
              +91 97408 48757
            </a>
            <a className="block hover:text-gold" href="tel:+919164840481">
              +91 91648 40481
            </a>
            <p className="pt-2 text-slate">Bengaluru, Karnataka</p>
          </div>
        </div>

        <form
          onSubmit={sendWhatsApp}
          className="rounded-[2rem] border border-teal/10 bg-white p-6 shadow-[0_30px_80px_-48px_rgba(15,62,70,0.55)] sm:p-8"
        >
          <label className="block text-xs font-medium tracking-wide text-teal uppercase">
            Full name
            <input required name="name" value={form.name} onChange={onChange} className={field} />
          </label>
          <label className="mt-4 block text-xs font-medium tracking-wide text-teal uppercase">
            Phone number
            <input
              required
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              className={field}
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-medium tracking-wide text-teal uppercase">
              Service required
              <select name="service" value={form.service} onChange={onChange} className={field}>
                <option>Architecture</option>
                <option>Interior</option>
                <option>Both</option>
              </select>
            </label>
            <label className="block text-xs font-medium tracking-wide text-teal uppercase">
              Property type
              <select name="property" value={form.property} onChange={onChange} className={field}>
                <option>1BHK</option>
                <option>2BHK</option>
                <option>3BHK</option>
                <option>Villa</option>
                <option>Commercial</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block text-xs font-medium tracking-wide text-teal uppercase">
            Budget range
            <select name="budget" value={form.budget} onChange={onChange} className={field}>
              <option>Under ₹10L</option>
              <option>₹10–15L</option>
              <option>₹15–25L</option>
              <option>₹25–40L</option>
              <option>₹40L+</option>
            </select>
          </label>
          <label className="mt-4 block text-xs font-medium tracking-wide text-teal uppercase">
            Message
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={onChange}
              className={field}
              placeholder="Plot size, G+ levels, rooms to design…"
            />
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white hover:bg-gold-deep"
            >
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={copyPayload}
              className="inline-flex items-center gap-2 rounded-full border border-teal/20 px-5 py-3 text-sm font-semibold text-teal"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy enquiry'}
            </button>
          </div>
          {sent && (
            <p className="mt-4 text-xs text-slate">
              WhatsApp opened with your enquiry. If it did not, copy the payload and paste it in chat.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
