import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const services = [
  {
    icon: '📣',
    title: 'Advertising',
    desc: 'Eye-catching ad campaigns across TV, print and digital that make your brand impossible to ignore.',
  },
  {
    icon: '💻',
    title: 'IT Solutions',
    desc: 'Websites, apps and smart software built to make your business run faster and smarter.',
  },
  {
    icon: '📱',
    title: 'Social Media Management',
    desc: 'We grow your followers, create scroll-stopping content and turn likes into loyal customers.',
  },
]

const stats = [
  { number: '50+', label: 'Happy Clients' },
  { number: '200+', label: 'Projects Done' },
  { number: '10M+', label: 'People Reached' },
  { number: '100%', label: 'Passion' },
]

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* soft glowing circles in background */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 text-center">
          <motion.img
            src="/logo.jpg"
            alt="Gloma International"
            className="h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover mx-auto mb-8 shadow-2xl"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          />

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We Help Brands <span className="text-gradient">Grow</span>
            <br /> &amp; Get Noticed
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Gloma International is your partner for advertising, IT solutions and
            social media management. See the work we've done for clients like you.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link
              to="/work"
              className="px-8 py-3 rounded-full bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
            >
              See Our Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Work With Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            What We <span className="text-gradient">Do</span>
          </h2>
          <p className="text-center text-navy/60 mt-3 max-w-xl mx-auto">
            Three things we're really good at.
          </p>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-3 mt-12">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-black/5"
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-navy/70 leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-4xl md:text-5xl font-extrabold text-gold">{s.number}</div>
              <div className="mt-2 text-white/70 text-sm md:text-base">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="max-w-4xl mx-auto px-5 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to grow your brand?
          </h2>
          <p className="text-navy/60 mt-4 text-lg">
            Let's create something amazing together.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-8 px-10 py-4 rounded-full bg-navy text-white font-semibold hover:bg-navy-light transition-colors"
          >
            Start a Project
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
