import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const info = [
  { icon: '📍', label: 'Visit us', value: 'No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa' },
  { icon: '📞', label: 'Call us', value: '011 711 0174', href: 'tel:0117110174' },
  { icon: '📧', label: 'Email us', value: 'info@glomaint.com', href: 'mailto:info@glomaint.com' },
]

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-gold focus:border-transparent'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // For now this shows a thank-you. Later we can connect a real email
    // service so messages land directly in info@glomaint.com.
    setSent(true)
  }

  return (
    <div className="bg-black">
      <PageHeader
        eyebrow="Let's Talk"
        title="Start Your Project"
        subtitle="Have a project in mind? Tell us about it — we'd love to help you grow."
      />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2">
        {/* Contact info */}
        <Reveal direction="right">
          <h2 className="text-2xl md:text-3xl font-bold mb-7">Get in touch</h2>
          <ul className="space-y-6">
            {info.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <span className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-gold/15 text-gold text-xl">
                  {item.icon}
                </span>
                <div>
                  <div className="text-sm text-soft">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-white hover:text-gold transition-colors">{item.value}</a>
                  ) : (
                    <div className="font-medium text-white">{item.value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal direction="left" delay={0.15}>
          {sent ? (
            <div className="glass-dark rounded-3xl p-10 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold">Thank you!</h3>
              <p className="text-soft mt-2">
                Your message has been received. Our team will be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Your Name</label>
                <input required type="text" className={inputCls} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Email</label>
                <input required type="email" className={inputCls} placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/80">Message</label>
                <textarea required rows={4} className={inputCls} placeholder="Tell us about your project..." />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-all hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </div>
  )
}
