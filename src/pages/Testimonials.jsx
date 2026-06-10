import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useCollection } from '../lib/useCollection'

export default function Testimonials() {
  const { items, loading } = useCollection('testimonials')

  return (
    <div>
      <PageHeader
        eyebrow="Reviews"
        title="Client Testimonials"
        subtitle="Don't take our word for it — hear it from the brands we've helped."
      />

      <section className="max-w-5xl mx-auto px-5 py-16">
        {loading ? (
          <p className="text-center text-ink/50">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-ink/50">Client reviews coming soon. 💬</p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {items.map((t, i) => (
              <Reveal key={t.id} delay={(i % 2) * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-black/5"
                >
                  <div className="text-gold text-4xl leading-none mb-3">“</div>
                  <p className="text-ink/80 italic leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-3 mt-6">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{t.name}</div>
                      {t.role && <div className="text-sm text-ink/60">{t.role}</div>}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
