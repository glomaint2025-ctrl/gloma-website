import { motion } from 'framer-motion'

// The navy banner at the top of each inner page
export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-5 py-16 md:py-20 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 text-white/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
