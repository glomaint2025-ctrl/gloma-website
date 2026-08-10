import Reveal from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { useCollection } from '../lib/useCollection'

const placeholders = [
  { id: 'p1', name: 'Client name', role: 'Coming soon', quote: 'Testimonials from our clients will appear here once added in the dashboard.' },
  { id: 'p2', name: 'Client name', role: 'Coming soon', quote: 'Every review gets its own moment as you scroll through this stack.' },
]

// Pure CSS "stacking cards" pattern: each card is sticky inside a tall
// wrapper, so the next card naturally slides up and over the previous one —
// no JS/GSAP required, and it degrades gracefully under reduced motion.
export default function TestimonialsStack() {
  const { items } = useCollection('testimonials')
  const testimonials = items.length > 0 ? items : placeholders

  return (
    <section id="testimonials" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <Reveal>
          <div>
            <span className="section-label text-white/60">Reviews</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              What Clients <span className="text-gradient-accent">Say</span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        {testimonials.map((t, i) => (
          <div key={t.id} className="min-h-[55vh] flex items-start" style={{ zIndex: i + 1 }}>
            <div className="sticky top-24 md:top-28 w-full">
              <TiltCard max={6}>
                <div className="rounded-3xl border border-white/10 bg-[#0f0f16] p-10 md:p-14 shadow-2xl shadow-black/50">
                  <div className="text-5xl leading-none mb-4 font-heading text-gradient-accent">&ldquo;</div>
                  <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-3 mt-8">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] grid place-items-center font-bold text-white">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      {t.role && <div className="text-sm text-white/50">{t.role}</div>}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
