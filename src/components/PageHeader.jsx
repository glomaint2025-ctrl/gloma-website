import { motion } from 'framer-motion'

// Premium navy banner at the top of each inner page.
export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <section className="relative bg-navy-deep text-white overflow-hidden">
      <div className="absolute inset-0 aurora opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(7,21,40,0.7))]" />

      <div className="relative max-w-6xl mx-auto px-5 pt-32 pb-20 md:pt-36 md:pb-24 text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase glass-dark text-gold-light mb-6"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-5 text-white/70 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
