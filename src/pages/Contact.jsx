import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // For now this just shows a thank-you. Later we can connect a real
    // email service so messages land in your inbox.
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        title="Let's Talk"
        subtitle="Have a project in mind? We'd love to hear from you."
      />

      <section className="max-w-5xl mx-auto px-5 py-16 grid gap-10 md:grid-cols-2">
        {/* Contact info */}
        <Reveal>
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <p className="text-navy/70 mb-6">
            Reach out through any of these, or fill the form and we'll get back to you.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="text-2xl">📧</span> hello@glomaint.com
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📞</span> +94 00 000 0000
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📍</span> Sri Lanka
            </li>
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.15}>
          {sent ? (
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold">Thank you!</h3>
              <p className="text-navy/60 mt-2">
                Your message has been received. We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-black/10 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-black/10 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-lg border border-black/10 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light transition-colors"
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
