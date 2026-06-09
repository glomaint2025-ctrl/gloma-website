import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const campaigns = [
  {
    title: 'Taxi App Launch',
    result: 'Reached 2M+ people in 30 days',
    desc: 'A full social + video campaign that drove thousands of app downloads.',
    metrics: [['2M+', 'Reach'], ['15K', 'Downloads'], ['4.8★', 'Rating']],
  },
  {
    title: 'Car Plus Total Care',
    result: '3x more bookings in 2 months',
    desc: 'Targeted ads and content that filled their calendar with new customers.',
    metrics: [['3x', 'Bookings'], ['120%', 'Engagement'], ['+8K', 'Followers']],
  },
  {
    title: 'Government SSB Awareness',
    result: 'Nationwide awareness campaign',
    desc: 'Creative messaging that reached communities across the country.',
    metrics: [['5M+', 'Views'], ['50+', 'Districts'], ['98%', 'Positive']],
  },
]

export default function Campaigns() {
  return (
    <div>
      <PageHeader
        title="Campaign Success"
        subtitle="Real campaigns, real numbers. Here's the impact we've delivered."
      />

      <section className="max-w-5xl mx-auto px-5 py-16 space-y-10">
        {campaigns.map((c, i) => (
          <Reveal key={c.title} delay={0}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-8 border border-black/5"
            >
              <span className="text-gold font-semibold text-sm uppercase tracking-wide">
                Case Study {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-bold mt-1">{c.title}</h3>
              <p className="text-lg text-navy/80 mt-1 font-medium">{c.result}</p>
              <p className="text-navy/60 mt-3">{c.desc}</p>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {c.metrics.map(([num, label]) => (
                  <div key={label} className="text-center bg-cream rounded-xl py-4">
                    <div className="text-2xl font-extrabold text-navy">{num}</div>
                    <div className="text-xs text-navy/60 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
