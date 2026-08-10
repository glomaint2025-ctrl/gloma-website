import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../sections/Hero'
import Services, { services } from '../sections/Services'
import Works from '../sections/Works'
import Showreel from '../sections/Showreel'
import TestimonialsStack from '../sections/TestimonialsStack'
import Stats from '../sections/Stats'
import FooterCTA from '../sections/FooterCTA'
import Reveal from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  // One video, scrubbed across the ENTIRE page's scroll progress — not
  // pinned to any one section, just a living backdrop behind everything.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reducedMotion) {
      video.pause()
      return
    }

    let trigger = null
    let onLoadedMeta = null

    const startScrub = () => {
      video.pause()
      trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const duration = video.duration || 0
          if (duration) video.currentTime = self.progress * duration
        },
      })
    }

    if (video.readyState >= 1) {
      startScrub()
    } else {
      onLoadedMeta = startScrub
      video.addEventListener('loadedmetadata', onLoadedMeta, { once: true })
    }

    return () => {
      trigger?.kill()
      if (onLoadedMeta) video.removeEventListener('loadedmetadata', onLoadedMeta)
    }
  }, [reducedMotion])

  return (
    <div ref={wrapRef} className="relative bg-[#0A0A0F]">
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black/45 z-[1]" />

      <div className="relative z-10">
        <Hero />
        <Services />
        <Works />
        <Showreel />
        <TestimonialsStack />
        <Stats />
        <Contact />
        <FooterCTA />
      </div>
    </div>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/10 scroll-mt-20">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">
        <Reveal>
          <div className="mb-14">
            <span className="section-label text-white/60">Connect</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
              Ready to <span className="text-gradient-accent">Scale?</span>
            </h2>
            <p className="mt-5 text-white/60 max-w-xl leading-relaxed">
              Tell us about your project — we&rsquo;d love to help you grow.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <ul className="space-y-6">
              <ContactItem icon="📧" label="Email Us" value="info@glomaint.com" href="mailto:info@glomaint.com" />
              <ContactItem icon="📞" label="Call Us" value="011 711 0174" href="tel:0117110174" />
              <ContactItem icon="📍" label="Visit Us" value="No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa" />
            </ul>
          </Reveal>
          <Reveal direction="left" delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value, href }) {
  return (
    <li className="flex items-start gap-4">
      <span className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/20 text-xl">
        {icon}
      </span>
      <div>
        <div className="text-sm text-white/50">{label}</div>
        {href ? (
          <a href={href} className="font-medium text-white hover:text-[#22D3EE] transition-colors">
            {value}
          </a>
        ) : (
          <div className="font-medium text-white">{value}</div>
        )}
      </div>
    </li>
  )
}

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent'

function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-white">Thank you!</h3>
        <p className="text-white/60 mt-2">Your message has been received. Our team will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-white/80">Your Name</label>
          <input required type="text" className={inputCls} placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-white/80">Email Address</label>
          <input required type="email" className={inputCls} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-white/80">Service Interested In</label>
        <select className={`${inputCls} [&>option]:text-black`} defaultValue="">
          <option value="" disabled>
            Select a service…
          </option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-white/80">Tell us about your project</label>
        <textarea required rows={4} className={inputCls} placeholder="What are you trying to grow?" />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-semibold hover:scale-[1.02] transition-transform"
      >
        Send Message
      </button>
    </form>
  )
}
