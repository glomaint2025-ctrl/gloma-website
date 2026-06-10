import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useCollection } from '../lib/useCollection'

export default function Campaigns() {
  const { items, loading } = useCollection('campaigns')

  return (
    <div>
      <PageHeader
        eyebrow="Case Studies"
        title="Campaign Success"
        subtitle="Real campaigns, real numbers. Here's the impact we've delivered."
      />

      <section className="max-w-5xl mx-auto px-5 py-16 space-y-10">
        {loading ? (
          <p className="text-center text-ink/50">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-ink/50">Our success stories are coming soon. 🚀</p>
        ) : (
          items.map((c, i) => (
            <Reveal key={c.id}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-8 border border-black/5"
              >
                <span className="text-gold font-semibold text-sm uppercase tracking-wide">
                  Case Study {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-bold mt-1">{c.title}</h3>
                {c.result && <p className="text-lg text-ink/80 mt-1 font-medium">{c.result}</p>}
                {c.description && <p className="text-ink/60 mt-3">{c.description}</p>}

                {Array.isArray(c.metrics) && c.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {c.metrics.map((m, idx) => (
                      <div key={idx} className="text-center bg-cream rounded-xl py-4">
                        <div className="text-2xl font-extrabold text-navy">{m.num}</div>
                        <div className="text-xs text-ink/60 mt-1">{m.label}</div>
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
