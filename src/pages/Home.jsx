import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import WorkCard from '../components/WorkCard'
import LogoMarquee from '../components/LogoMarquee'
import TiltCard from '../components/TiltCard'
import { useCollection } from '../lib/useCollection'
import { useSettings } from '../lib/useSettings'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'reel', label: 'Reels' },
  { key: 'ad', label: 'Ads' },
  { key: 'graphic', label: 'Graphics' },
]

export default function Home() {
  const settings = useSettings()
  const { items: works } = useCollection('works')
  const { items: clients } = useCollection('clients')
  const { items: platforms } = useCollection('platforms')
  const { items: testimonials } = useCollection('testimonials')

  const [filter, setFilter] = useState('all')
  const shownWorks = (filter === 'all' ? works : works.filter((w) => w.media_type === filter)).slice(0, 9)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const stats = [
    { end: settings?.stat_projects ?? 200, suffix: '+', label: 'Projects' },
    { end: settings?.stat_years ?? 5, suffix: '+', label: 'Years' },
    { end: settings?.stat_team ?? 25, suffix: '+', label: 'Team' },
    { end: settings?.stat_satisfaction ?? 98, suffix: '%', label: 'Happy Clients' },
  ]

  return (
    <div>
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden bg-navy-deep text-white">
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(7,21,40,0.7))]" />
        <div className="absolute top-1/4 -left-16 w-72 h-72 rounded-full border border-gold/20 float" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 rounded-full border border-white/5 float" style={{ animationDelay: '2s' }} />

        <motion.div style={{ y, opacity }} className="relative max-w-6xl mx-auto px-5 text-center w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm tracking-widest uppercase glass-dark text-gold-light mb-7"
          >
            Creative Content Studio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            Content That's <span className="text-gradient">Impossible</span>
            <br /> to Scroll Past
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed"
          >
            We craft reels, ads and scroll-stopping social content that grow brands.
            Take a look at what we've made.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a href="#work" className="px-8 py-3.5 rounded-full bg-gold text-navy-deep font-semibold hover:bg-gold-light transition-all hover:scale-105 shadow-lg shadow-gold/20">
              View Our Work
            </a>
            <Link to="/contact" className="px-8 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/10 transition-all hover:scale-105">
              Work With Us
            </Link>
          </motion.div>

          {/* slim stats */}
          <div className="mt-14 grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-4xl font-extrabold text-gradient">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-white/50 text-[11px] md:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ OUR WORK ============ */}
      <section id="work" className="max-w-6xl mx-auto px-5 py-20 scroll-mt-20">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-gold font-semibold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">Our Work</h2>
            <p className="text-ink/60 mt-3">Reels, ads and graphic posts we're proud of.</p>
          </div>
        </Reveal>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key ? 'bg-navy text-white shadow-lg' : 'bg-white text-ink/70 hover:bg-black/5 border border-black/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {shownWorks.length === 0 ? (
          <p className="text-center text-ink/50 py-10">Fresh work coming soon. 🎬</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
            {shownWorks.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 0.1}>
                <WorkCard work={w} />
              </Reveal>
            ))}
          </div>
        )}

        {works.length > 9 && (
          <div className="text-center mt-10">
            <Link to="/work" className="inline-block px-8 py-3 rounded-full bg-navy text-white font-semibold hover:bg-navy-light transition-colors">
              View All Work →
            </Link>
          </div>
        )}
      </section>

      {/* ============ TRUSTED CLIENTS ============ */}
      {clients.length > 0 && (
        <section className="bg-white border-y border-black/5 py-16">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <p className="text-center text-ink/50 text-sm tracking-widest uppercase mb-8">
                Trusted by brands we love
              </p>
            </Reveal>
            <LogoMarquee clients={clients} />
          </div>
        </section>
      )}

      {/* ============ PLATFORMS ============ */}
      {platforms.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-20">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm">Where we work</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">Platforms We Work On</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1000 }}>
            {platforms.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.1}>
                <TiltCard className="h-full">
                  <div className="h-full bg-white rounded-2xl p-6 border border-black/5 text-center card-hover">
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.name} className="h-14 w-14 object-contain mx-auto mb-4" />
                    ) : (
                      <div className="h-14 w-14 rounded-xl bg-navy text-gold grid place-items-center text-2xl mx-auto mb-4">★</div>
                    )}
                    <h3 className="font-bold">{p.name}</h3>
                    {p.description && <p className="text-ink/60 text-sm mt-1">{p.description}</p>}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============ TESTIMONIALS ============ */}
      {testimonials.length > 0 && (
        <section className="bg-navy-deep text-white relative overflow-hidden">
          <div className="absolute inset-0 aurora opacity-30" />
          <div className="relative max-w-4xl mx-auto px-5 py-24">
            <Reveal>
              <div className="text-center mb-12">
                <span className="text-gold font-semibold tracking-widest uppercase text-sm">Reviews</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-3">What Clients Say</h2>
              </div>
            </Reveal>
            <TestimonialRotator testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="max-w-4xl mx-auto px-5 py-24 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Let's make your brand <span className="text-gradient">unforgettable</span>
          </h2>
          <Link to="/contact" className="inline-block mt-8 px-10 py-4 rounded-full bg-navy text-white font-semibold hover:bg-navy-light transition-all hover:scale-105 shadow-xl shadow-navy/20">
            Start a Project
          </Link>
        </Reveal>
      </section>
    </div>
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
          <div className="text-gold text-5xl leading-none mb-4">“</div>
          <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed max-w-2xl mx-auto">{t.quote}</p>
          <div className="flex items-center justify-center gap-3 mt-8">
            {t.avatar_url ? (
              <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gold text-navy-deep grid place-items-center font-bold">{t.name.charAt(0)}</div>
            )}
            <div className="text-left">
              <div className="font-bold">{t.name}</div>
              {t.role && <div className="text-sm text-white/60">{t.role}</div>}
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
