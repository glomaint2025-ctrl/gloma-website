import { Link } from 'react-router-dom'
import { useSettings } from '../lib/useSettings'

// Maps each settings field to its icon + label
const socialMap = [
  { key: 'facebook_url', label: 'Facebook', icon: 'f' },
  { key: 'instagram_url', label: 'Instagram', icon: '◎' },
  { key: 'youtube_url', label: 'YouTube', icon: '▶' },
  { key: 'tiktok_url', label: 'TikTok', icon: '♪' },
  { key: 'whatsapp_url', label: 'WhatsApp', icon: '✆' },
]

export default function Footer() {
  const settings = useSettings()
  // Only show socials that have a link filled in
  const socials = socialMap.filter((s) => settings?.[s.key])

  return (
    <footer className="relative bg-black-deep text-white/80 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 aurora opacity-40" />

      <div className="relative max-w-6xl mx-auto px-5 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.jpg" alt="Gloma" className="h-11 w-11 rounded-lg object-cover ring-1 ring-white/20" />
            <span className="font-bold text-white text-lg">GLOMA INTERNATIONAL</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md text-white/60">
            We are a passionate team of digital enthusiasts committed to helping
            businesses thrive online — a Global Digital Ecosystem built to
            accelerate your growth.
          </p>

          {/* Socials (only the ones set in the dashboard) */}
          {socials.length > 0 && (
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={settings[s.key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="h-10 w-10 grid place-items-center rounded-full glass-dark hover:bg-gold hover:text-black transition-colors"
                >
                  <span aria-hidden>{s.icon}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/work" className="hover:text-gold">Our Work</Link></li>
            <li><Link to="/videos" className="hover:text-gold">Videos</Link></li>
            <li><Link to="/campaigns" className="hover:text-gold">Campaigns</Link></li>
            <li><Link to="/testimonials" className="hover:text-gold">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <span>📍</span>
              <span>No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa</span>
            </li>
            <li className="flex gap-2">
              <span>📞</span>
              <a href="tel:0117110174" className="hover:text-gold">011 711 0174</a>
            </li>
            <li className="flex gap-2">
              <span>📧</span>
              <a href="mailto:info@glomaint.com" className="hover:text-gold">info@glomaint.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Gloma International (Pvt) Ltd. All rights reserved.
      </div>
    </footer>
  )
}
