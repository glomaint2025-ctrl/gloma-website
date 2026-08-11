import { useState } from 'react'
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

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 px-4">
      <nav className="max-w-5xl mx-auto h-16 rounded-full bg-navy-deep shadow-lg shadow-black/30 px-3 md:px-4 flex items-center justify-between">
        {/* Logo + name */}
        <Link to="/" className="flex items-center gap-3 pl-1" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="Gloma International" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-white font-semibold tracking-wide hidden sm:block text-sm">
            GLOMA <span className="text-gold">INTERNATIONAL</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-gold text-white/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA on desktop */}
        <Link
          to="/#contact"
          className="hidden md:inline-block px-5 py-2.5 rounded-full bg-gold text-navy-deep text-sm font-semibold hover:bg-gold-light transition-colors tracking-wide"
        >
          Start Your Project
        </Link>

        {/* Hamburger (phones only) */}
        <button
          className="md:hidden text-white text-2xl px-2"
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
            className="md:hidden overflow-hidden bg-navy-deep rounded-3xl mt-2 max-w-5xl mx-auto shadow-lg shadow-black/30"
          >
            {links.map((link) => (
              <li key={link.to} className="border-b border-white/10 last:border-0">
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-base font-medium text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="p-4">
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-3 rounded-full bg-gold text-navy-deep font-semibold"
              >
                Start Your Project
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
