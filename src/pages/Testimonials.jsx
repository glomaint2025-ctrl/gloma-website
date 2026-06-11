import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useCollection } from '../lib/useCollection'

export default function Testimonials() {
  const { items, loading } = useCollection('testimonials')

  return (
    <div className="bg-black">
      <PageHeader
        eyebrow="Reviews"
        title="Client Testimonials"
        subtitle="Don't take our word for it — hear it from the brands we've helped."
      />

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <p className="text-center text-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-soft">Client reviews coming soon. 💬</p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {items.map((t, i) => (
              <Reveal key={t.id} delay={(i % 2) * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full glass-dark rounded-3xl p-8 card-hover"
                >
                  <div className="text-gold text-5xl leading-none mb-3 font-heading">“</div>
                  <p className="text-white/85 italic leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-3 mt-6">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gold text-black flex items-center justify-center font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{t.name}</div>
                      {t.role && <div className="text-sm text-soft">{t.role}</div>}
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
