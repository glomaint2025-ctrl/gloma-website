import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import WorkCard from '../components/WorkCard'
import LogoMarquee from '../components/LogoMarquee'
import VideoPlayer from '../components/VideoPlayer'
import TiltCard from '../components/TiltCard'
import { useCollection } from '../lib/useCollection'
import { useSettings } from '../lib/useSettings'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'reel', label: 'Reels' },
  { key: 'ad', label: 'Ads' },
  { key: 'graphic', label: 'Graphics' },
]

const services = [
  { icon: '🎨', title: 'Creative Content & Design', desc: 'Scroll-stopping visuals, branding and campaign creatives that make people remember you.' },
  { icon: '📈', title: 'Data-Driven Social Media Marketing', desc: 'Smart campaigns backed by real data that turn followers into loyal customers.' },
  { icon: '🌐', title: 'Global Web & Software Solutions', desc: 'Custom websites and software built to grow with your business, anywhere in the world.' },
  { icon: '🛒', title: 'Global Trade & E-commerce', desc: 'End-to-end online stores and trade solutions that sell across borders.' },
  { icon: '🖥️', title: 'IT Hardware & Infrastructure', desc: 'Reliable hardware and infrastructure that keep your business powered and connected.' },
  { icon: '🎓', title: 'Advanced Tech Education', desc: 'Hands-on training and courses that level up your team’s digital skills.' },
  { icon: '🤖', title: 'AI-Driven Business Automation', desc: 'Let AI handle the repetitive work so you can focus on real growth.' },
]

// Collect cover images from works
function workCovers(works, max = 10) {
  const out = []
  for (const w of works) {
    const cover = w.image_url || (Array.isArray(w.images) ? w.images[0] : '')
    if (cover) out.push({ src: cover, title: w.title, category: w.category })
    if (out.length >= max) break
  }
  return out
}

// Section heading in their style: small label + two-tone title
function SectionHeader({ label, title, accent, desc, center }) {
  return (
    <Reveal>
      <div className={`mb-14 ${center ? 'text-center' : ''}`}>
        <span className="section-label">{label}</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
          {title} <span className="text-gradient">{accent}</span>
        </h2>
        {desc && <p className={`mt-5 text-soft max-w-xl leading-relaxed ${center ? 'mx-auto' : ''}`}>{desc}</p>}
      </div>
    </Reveal>
  )
}

export default function Home() {
  const settings = useSettings()
  const { items: works } = useCollection('works')
  const { items: clients } = useCollection('clients')
  const { items: videos } = useCollection('videos')
  const { items: campaigns } = useCollection('campaigns')
  const { items: testimonials } = useCollection('testimonials')

  const [filter, setFilter] = useState('all')
  const shownWorks = (filter === 'all' ? works : works.filter((w) => w.media_type === filter)).slice(0, 6)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yCol2 = useTransform(scrollYProgress, [0, 1], [40, 200])

  const covers = workCovers(works)

  const stats = [
    { end: settings?.stat_projects ?? 200, suffix: '+', label: 'Projects' },
    { end: settings?.stat_years ?? 5, suffix: '+', label: 'Years' },
    { end: settings?.stat_team ?? 25, suffix: '+', label: 'Team' },
    { end: settings?.stat_satisfaction ?? 98, suffix: '%', label: 'Happy Clients' },
  ]

  return (
    <div className="bg-black">
      {/* ============ 1 · HERO ============ */}
      <section id="hero" ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden bg-black text-white">
        <div className="orb absolute -top-32 -left-32 w-[480px] h-[480px]" />
        <div className="orb absolute top-1/3 -right-40 w-[560px] h-[560px] opacity-70" />
        <div className="orb absolute -bottom-40 left-1/3 w-[420px] h-[420px] opacity-50" />

        {covers.length >= 4 && (
          <>
            {/* faint work columns on BOTH edges, behind the centered text */}
            <motion.div style={{ y: yCol1 }} className="absolute inset-y-0 -left-10 w-56 hidden lg:flex flex-col gap-5 -mt-16 opacity-30 pointer-events-none" >
              {covers.slice(0, 4).map((c, i) => (
                <img key={i} src={c.src} alt="" className="w-full aspect-[4/5] object-cover rounded-2xl border border-white/10" />
              ))}
            </motion.div>
            <motion.div style={{ y: yCol2 }} className="absolute inset-y-0 -right-10 w-56 hidden lg:flex flex-col gap-5 -mt-32 opacity-30 pointer-events-none">
              {covers.slice(4, 8).map((c, i) => (
                <img key={i} src={c.src} alt="" className="w-full aspect-[4/5] object-cover rounded-2xl border border-white/10" />
              ))}
            </motion.div>
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)]" />

        <motion.div style={{ y: yText, opacity }} className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full text-center">
          <div className="max-w-3xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-label">
              Gloma International — Creative Content Studio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[0.98] tracking-tight"
            >
              Your Partner in
              <br />
              <span className="text-gradient">Digital Evolution</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-7 text-lg md:text-xl text-soft max-w-xl mx-auto leading-relaxed"
            >
              We craft reels, ads and scroll-stopping social content that grow brands.
              Scroll to see what we&rsquo;ve made.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4 justify-center"
            >
              <a href="#work" className="px-8 py-3.5 rounded-full bg-gold text-black font-semibold hover:bg-gold-light transition-all hover:scale-105 shadow-lg shadow-gold/25">
                View Our Work
              </a>
              <a href="#contact" className="px-8 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/10 transition-all hover:scale-105">
                Start Your Project
              </a>
            </motion.div>

            <div className="mt-14 grid grid-cols-4 gap-4 max-w-xl mx-auto">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-4xl font-extrabold text-gradient font-heading">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-soft text-[11px] md:text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-soft">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="block w-px h-10 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* ============ 2 · GALLERY STRIP (auto-scrolling work) ============ */}
      {covers.length >= 3 && (
        <section id="gallery-strip" className="py-10 border-y border-white/5 bg-charcoal overflow-hidden">
          <div className="marquee-track gap-6">
            {[...covers, ...covers].map((c, i) => (
              <div key={i} className="group relative shrink-0 w-64 md:w-80 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <img src={c.src} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="text-white text-sm font-semibold">{c.title}</div>
                  {c.category && <div className="text-gold-light text-xs uppercase tracking-wider mt-0.5">{c.category}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ 3 · SELECTED WORK ============ */}
      <section id="work" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 scroll-mt-20">
        <SectionHeader label="Selected Work" title="Work That" accent="Speaks" desc="Reels, ads and graphic posts crafted to stop thumbs and grow brands." />

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'glass-dark text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {shownWorks.length === 0 ? (
          <p className="text-center text-soft py-10">Fresh work coming soon. 🎬</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
            {shownWorks.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 0.1}>
                <WorkCard work={w} />
              </Reveal>
            ))}
          </div>
        )}

        {works.length > 6 && (
          <div className="text-center mt-12">
            <Link to="/work" className="inline-block px-8 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/10 transition-all hover:scale-105">
              View All Work →
            </Link>
          </div>
        )}
      </section>

      {/* ============ 4 · ABOUT / VISION ============ */}
      <section id="about" className="relative bg-charcoal border-y border-white/5 overflow-hidden scroll-mt-20">
        <div className="orb absolute -top-24 -right-24 w-[420px] h-[420px] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 grid gap-14 lg:grid-cols-2 items-center">
          <Reveal>
            <div>
              <span className="section-label">Vision</span>
              <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Defining the <span className="text-gradient">New Era</span>
                <br /> of Digital
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="text-soft text-lg leading-relaxed">
                We are more than service providers — we are a Global Digital Ecosystem
                designed to accelerate your growth. From creative content to AI
                automation, we empower the next generation of digital entrepreneurs.
              </p>
              <div className="flex gap-12 mt-10">
                <div>
                  <div className="text-5xl md:text-6xl font-extrabold text-gradient font-heading">
                    <CountUp end={settings?.stat_satisfaction ?? 98} suffix="%" />
                  </div>
                  <div className="text-soft mt-2 text-sm">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-extrabold text-gradient font-heading">
                    <CountUp end={settings?.stat_projects ?? 200} suffix="+" />
                  </div>
                  <div className="text-soft mt-2 text-sm">Projects Delivered</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 5 · SERVICES / EXPERTISE ============ */}
      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 scroll-mt-20">
        <SectionHeader label="Expertise" title="Complete Digital" accent="Solutions" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.12}>
              <TiltCard className="h-full">
                <div className="group relative h-full glass-dark rounded-3xl p-7 card-hover overflow-hidden">
                  {/* soft gold glow that appears on hover */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gold/0 group-hover:bg-gold/15 blur-2xl transition-all duration-700" />
                  {/* big ghost number */}
                  <span className="absolute top-5 right-6 font-heading font-extrabold text-4xl text-white/5 group-hover:text-gold/20 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="h-14 w-14 rounded-2xl bg-gold/15 grid place-items-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-gold-light transition-colors">{s.title}</h3>
                  <p className="text-soft text-sm mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 6 · VIDEOS / PRODUCTION ============ */}
      {videos.length > 0 && (
        <section id="videos" className="relative bg-charcoal border-y border-white/5 overflow-hidden scroll-mt-20">
          <div className="orb absolute -bottom-24 -left-24 w-[400px] h-[400px] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">
            <SectionHeader label="Production" title="Made in" accent="Motion" />
            <div className="grid gap-7 md:grid-cols-2">
              {videos.slice(0, 4).map((v, i) => (
                <Reveal key={v.id} delay={(i % 2) * 0.12}>
                  <div className="rounded-3xl overflow-hidden glass-dark card-hover h-full">
                    <div className="aspect-video bg-black-deep">
                      <VideoPlayer url={v.video_url} />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold">{v.title}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {videos.length > 4 && (
              <div className="text-center mt-12">
                <Link to="/videos" className="inline-block px-8 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/10 transition-all hover:scale-105">
                  View All Videos →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ 7 · PARTNERS / CLIENTS ============ */}
      {clients.length > 0 && (
        <section id="clients" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-28 scroll-mt-20">
          <SectionHeader label="Partners" title="Trusted by" accent="Great Brands" center />
          <LogoMarquee clients={clients} />
        </section>
      )}

      {/* ============ 8 · CASE STUDIES / RESULTS ============ */}
      {campaigns.length > 0 && (
        <section id="case-studies" className="relative bg-charcoal border-y border-white/5 overflow-hidden scroll-mt-20">
          <div className="orb absolute top-0 right-1/4 w-[380px] h-[380px] opacity-50" />
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
            <SectionHeader label="Results" title="Growth" accent="Stories" center />
            <div className="space-y-10">
              {campaigns.map((c, i) => (
                <Reveal key={c.id}>
                  <motion.div whileHover={{ scale: 1.01 }} className="rounded-3xl glass-dark card-hover p-8 md:p-10">
                    <span className="section-label">Case Study {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-3">{c.title}</h3>
                    {c.result && <p className="text-lg text-gold-light mt-2 font-medium">{c.result}</p>}
                    {c.description && <p className="text-soft mt-3 leading-relaxed">{c.description}</p>}
                    {Array.isArray(c.metrics) && c.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-8">
                        {c.metrics.map((m, idx) => (
                          <div key={idx} className="text-center bg-white/5 border border-white/10 rounded-2xl py-5">
                            <div className="text-2xl md:text-3xl font-extrabold text-gradient font-heading">{m.num}</div>
                            <div className="text-xs text-soft mt-1.5">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 9 · TESTIMONIALS ============ */}
      {testimonials.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 aurora opacity-60" />
          <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32">
            <SectionHeader label="Reviews" title="What Clients" accent="Say" center />
            <TestimonialRotator testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ============ 10 · CONTACT / CONNECT ============ */}
      <section id="contact" className="relative bg-charcoal border-t border-white/5 overflow-hidden scroll-mt-20">
        <div className="orb absolute -top-24 left-1/3 w-[420px] h-[420px] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <SectionHeader label="Connect" title="Ready to" accent="Scale?" desc="Tell us about your project — we'd love to help you grow." />

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
    </div>
  )
}

function ContactItem({ icon, label, value, href }) {
  return (
    <li className="flex items-start gap-4">
      <span className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-gold/15 text-gold text-xl">{icon}</span>
      <div>
        <div className="text-sm text-soft">{label}</div>
        {href ? (
          <a href={href} className="font-medium text-white hover:text-gold transition-colors">{value}</a>
        ) : (
          <div className="font-medium text-white">{value}</div>
        )}
      </div>
    </li>
  )
}

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-gold focus:border-transparent'

function ContactForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="glass-dark rounded-3xl p-10 text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h3 className="text-xl font-bold">Thank you!</h3>
        <p className="text-soft mt-2">Your message has been received. Our team will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="glass-dark rounded-3xl p-8 space-y-4">
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
          <option value="" disabled>Select a service…</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>{s.title}</option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-white/80">Tell us about your project</label>
        <textarea required rows={4} className={inputCls} placeholder="What are you trying to grow?" />
      </div>
      <button type="submit" className="w-full py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-all hover:scale-[1.02]">
        Send Message
      </button>
    </form>
  )
}

// Auto-rotating animated testimonial
function TestimonialRotator({ testimonials }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((prev) => (prev + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [testimonials.length])

  const t = testimonials[i]
  return (
    <div className="relative min-h-[220px] grid place-items-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -30, rotateX: 15 }}
          transition={{ duration: 0.5 }}
          style={{ transformPerspective: 1000 }}
        >
          <div className="text-gold text-5xl leading-none mb-4 font-heading">“</div>
          <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed max-w-2xl mx-auto">{t.quote}</p>
          <div className="flex items-center justify-center gap-3 mt-8">
            {t.avatar_url ? (
              <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gold text-black grid place-items-center font-bold">{t.name.charAt(0)}</div>
            )}
            <div className="text-left">
              <div className="font-bold">{t.name}</div>
              {t.role && <div className="text-sm text-soft">{t.role}</div>}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-gold' : 'w-2 bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}
