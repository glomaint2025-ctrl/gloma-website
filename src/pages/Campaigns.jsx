import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useCollection } from '../lib/useCollection'

export default function Campaigns() {
  const { items, loading } = useCollection('campaigns')

  return (
    <div className="bg-black">
      <PageHeader
        eyebrow="Case Studies"
        title="Campaign Success"
        subtitle="Real campaigns, real numbers. Here's the impact we've delivered."
      />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-10">
        {loading ? (
          <p className="text-center text-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-soft">Our success stories are coming soon. 🚀</p>
        ) : (
          items.map((c, i) => (
            <Reveal key={c.id}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-3xl glass-dark card-hover p-8 md:p-10"
              >
                <span className="section-label">
                  Case Study {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mt-3">{c.title}</h3>
                {c.result && <p className="text-lg text-gold-light mt-2 font-medium">{c.result}</p>}
                {c.description && <p className="text-soft mt-3 leading-relaxed">{c.description}</p>}

                {Array.isArray(c.metrics) && c.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {c.metrics.map((m, idx) => (
                      <div key={idx} className="text-center bg-white/5 border border-white/10 rounded-2xl py-5">
                        <div className="text-2xl md:text-3xl font-extrabold text-gradient font-heading">{m.num}</div>
                        <div className="text-xs text-soft mt-1.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))
        )}
      </section>
    </div>
  )
}
