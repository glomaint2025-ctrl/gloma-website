import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const testimonials = [
  {
    name: 'Kasun Perera',
    role: 'Owner, Car Plus Total Care',
    quote: 'Gloma transformed our online presence. Bookings tripled in just two months. Truly professional team!',
  },
  {
    name: 'Nadeema Sanjeewani',
    role: 'Public Figure',
    quote: 'Their social media management is outstanding. My engagement has never been higher. Highly recommend.',
  },
  {
    name: 'Ruwan Silva',
    role: 'Director, Weknow Taxi',
    quote: 'From the app promo video to the ad campaign, everything was top quality. They really understand marketing.',
  },
  {
    name: 'Amara Fernando',
    role: 'Marketing Lead',
    quote: 'Creative, fast and reliable. Gloma delivered beyond our expectations every single time.',
  },
]

export default function Testimonials() {
  return (
    <div>
      <PageHeader
        title="Client Testimonials"
        subtitle="Don't take our word for it — hear it from the brands we've helped."
      />

      <section className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid gap-7 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                className="h-full bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-black/5"
              >
                <div className="text-gold text-4xl leading-none mb-3">“</div>
                <p className="text-navy/80 italic leading-relaxed">{t.quote}</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="h-12 w-12 rounded-full bg-navy text-gold flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-navy/60">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
