import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// One-page flow: links jump to homepage sections (like thesocialsglobal.com)
const links = [
  { to: '/#services', label: 'Services' },
  { to: '/#work', label: 'Work' },
  { to: '/#showreel', label: 'Showreel' },
  { to: '/#testimonials', label: 'Reviews' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll to switch the navbar from clear to solid
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-0'
          : 'bg-transparent py-2'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo + name */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="Gloma International" className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/20" />
          <span className="text-white font-bold tracking-wide hidden sm:block">
            GLOMA <span className="text-gold">INTERNATIONAL</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-gold text-white/90"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA on desktop */}
        <Link
          to="/#contact"
          className="hidden md:inline-block px-5 py-2 rounded-full bg-gold text-black text-sm font-semibold hover:bg-gold-light transition-colors tracking-wide"
        >
          START YOUR PROJECT
        </Link>

        {/* Hamburger (phones only) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-5"
          >
            {links.map((link) => (
              <li key={link.to} className="border-b border-white/10 last:border-0">
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base font-medium text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-3 rounded-full bg-gold text-black font-semibold"
              >
                Let’s Talk
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
