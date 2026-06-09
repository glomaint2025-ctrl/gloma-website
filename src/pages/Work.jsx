import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

/* 👉 To add your real work later, just add more items to this list.
   Replace `image` with a path like "/work/project1.jpg" after you put
   the picture in the public/work folder. For now we use a colored box. */
const projects = [
  { title: 'Car Plus Total Care', category: 'Branding & Ads', color: 'from-blue-500 to-indigo-700' },
  { title: 'Weknow Taxi', category: 'App Promo', color: 'from-amber-400 to-orange-600' },
  { title: 'Nadeema Sanjeewani', category: 'Social Media', color: 'from-pink-500 to-rose-700' },
  { title: 'Government SSB', category: 'Campaign', color: 'from-emerald-500 to-teal-700' },
  { title: 'Ruseel', category: 'Advertising', color: 'from-violet-500 to-purple-700' },
  { title: 'Taxi App', category: 'IT Solution', color: 'from-cyan-500 to-sky-700' },
]

export default function Work() {
  return (
    <div>
      <PageHeader
        title="Our Work"
        subtitle="A selection of projects we're proud of. Real brands, real results."
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow bg-white"
              >
                {/* Image / colored placeholder */}
                <div className={`h-52 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                  <span className="text-white/90 text-lg font-semibold px-4 text-center">
                    {p.title}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-wide text-gold font-semibold">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{p.title}</h3>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
