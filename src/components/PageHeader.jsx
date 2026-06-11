import { motion } from 'framer-motion'

// Big dark banner at the top of each inner page.
export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="orb absolute -top-24 -left-24 w-[420px] h-[420px]" />
      <div className="orb absolute -bottom-32 right-0 w-[480px] h-[480px] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28 text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          className="mt-5 text-5xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-6 text-soft max-w-2xl mx-auto text-lg leading-relaxed"
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
