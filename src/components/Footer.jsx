import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src="/logo.jpg" alt="Gloma" className="h-10 w-10 rounded-md object-cover" />
            <span className="font-bold text-white">GLOMA INTERNATIONAL</span>
          </div>
          <p className="text-sm leading-relaxed">
            Advertising, IT solutions and social media management — helping brands
            grow with creative campaigns that get results.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-gold font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/work" className="hover:text-gold">Our Work</Link></li>
            <li><Link to="/videos" className="hover:text-gold">Videos</Link></li>
            <li><Link to="/campaigns" className="hover:text-gold">Campaigns</Link></li>
            <li><Link to="/testimonials" className="hover:text-gold">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-semibold mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm">
            <li>📧 hello@glomaint.com</li>
            <li>📞 +94 00 000 0000</li>
            <li>📍 Sri Lanka</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Gloma International (Pvt) Ltd. All rights reserved.
      </div>
    </footer>
  )
}
