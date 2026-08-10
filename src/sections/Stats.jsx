import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { useSettings } from '../lib/useSettings'

export default function Stats() {
  const settings = useSettings()

  const stats = [
    { end: settings?.stat_projects ?? 200, suffix: '+', label: 'Projects Delivered' },
    { end: settings?.stat_years ?? 5, suffix: '+', label: 'Years of Innovation' },
    { end: settings?.stat_team ?? 25, suffix: '+', label: 'Expert Team Members' },
    { end: settings?.stat_satisfaction ?? 98, suffix: '%', label: 'Client Satisfaction' },
  ]

  return (
    <section className="relative py-24 md:py-28 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div>
              <div className="text-4xl md:text-6xl font-extrabold text-gradient-accent font-heading">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-widest">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
