import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Our Work' },
  { to: '/videos', label: 'Videos' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
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
          ? 'bg-navy-deep/90 backdrop-blur-md shadow-lg shadow-black/20 py-0'
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
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-gold ${
                    isActive ? 'text-gold' : 'text-white/90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA on desktop */}
        <Link
          to="/contact"
          className="hidden md:inline-block px-5 py-2 rounded-full bg-gold text-navy-deep text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          Let’s Talk
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
            className="md:hidden overflow-hidden bg-navy-deep/95 backdrop-blur-md px-5"
          >
            {links.map((link) => (
              <li key={link.to} className="border-b border-white/10 last:border-0">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 text-base font-medium ${isActive ? 'text-gold' : 'text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="py-4">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-3 rounded-full bg-gold text-navy-deep font-semibold"
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
