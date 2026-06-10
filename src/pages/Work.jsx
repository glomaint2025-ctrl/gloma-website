import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import WorkCard from '../components/WorkCard'
import { useCollection } from '../lib/useCollection'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'reel', label: 'Reels' },
  { key: 'ad', label: 'Ads' },
  { key: 'graphic', label: 'Graphics' },
]

export default function Work() {
  const { items, loading } = useCollection('works')
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? items : items.filter((w) => w.media_type === filter)

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio"
        title="Our Work"
        subtitle="Reels, ads and graphic posts crafted for brands like yours."
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key ? 'bg-navy text-white shadow-lg' : 'bg-white text-ink/70 hover:bg-black/5 border border-black/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-ink/50">Loading…</p>
        ) : shown.length === 0 ? (
          <p className="text-center text-ink/50">Nothing here yet — check back soon! 🎬</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
            {shown.map((w, i) => (
              <Reveal key={w.id} delay={(i % 3) * 0.08}>
                <WorkCard work={w} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
