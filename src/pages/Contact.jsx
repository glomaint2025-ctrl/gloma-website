import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const info = [
  { icon: '📍', label: 'Visit us', value: 'No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa' },
  { icon: '📞', label: 'Call us', value: '011 711 0174', href: 'tel:0117110174' },
  { icon: '📧', label: 'Email us', value: 'info@glomaint.com', href: 'mailto:info@glomaint.com' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // For now this shows a thank-you. Later we can connect a real email
    // service so messages land directly in info@glomaint.com.
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Let's Talk"
        title="Book a Free Consultation"
        subtitle="Have a project in mind? Tell us about it — we'd love to help you grow."
      />

      <section className="max-w-5xl mx-auto px-5 py-20 grid gap-12 md:grid-cols-2">
        {/* Contact info */}
        <Reveal direction="right">
          <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
          <ul className="space-y-6">
            {info.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <span className="h-12 w-12 shrink-0 grid place-items-center rounded-xl bg-navy text-gold text-xl">
                  {item.icon}
                </span>
                <div>
                  <div className="text-sm text-ink/50">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-medium hover:text-gold">{item.value}</a>
                  ) : (
                    <div className="font-medium">{item.value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal direction="left" delay={0.15}>
          {sent ? (
            <div className="glass rounded-2xl p-10 shadow-xl text-center border border-black/5">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold">Thank you!</h3>
              <p className="text-ink/60 mt-2">
                Your message has been received. Our team will be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-4 border border-black/5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Your Name</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-navy text-white font-semibold hover:bg-navy-light transition-all hover:scale-[1.02]"
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
