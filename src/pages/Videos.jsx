import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import VideoPlayer from '../components/VideoPlayer'
import { useCollection } from '../lib/useCollection'

export default function Videos() {
  const { items, loading } = useCollection('videos')

  return (
    <div className="bg-black">
      <PageHeader
        eyebrow="Watch"
        title="Our Videos"
        subtitle="Reels, ads and promos we've produced for our clients."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        {loading ? (
          <p className="text-center text-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-soft">New videos are on the way. 🎬</p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {items.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 0.12}>
                <div className="rounded-3xl overflow-hidden glass-dark card-hover h-full">
                  <div className="aspect-video bg-black-deep">
                    <VideoPlayer url={v.video_url} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{v.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
