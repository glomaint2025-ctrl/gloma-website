import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useCollection } from '../lib/useCollection'

// Turn a normal YouTube link into an embeddable player link.
function youtubeEmbed(url) {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  return yt ? `https://www.youtube.com/embed/${yt[1]}` : null
}

function isVideoFile(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url || '')
}

function VideoPlayer({ url }) {
  const embed = youtubeEmbed(url)
  if (embed) {
    return (
      <iframe
        src={embed}
        title="video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (isVideoFile(url)) {
    return <video src={url} controls className="w-full h-full object-cover" />
  }
  // Fallback: a link button
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="w-full h-full flex flex-col items-center justify-center text-white/70 hover:text-gold">
      <div className="text-5xl mb-2">▶️</div>
      <span className="text-sm">Watch video</span>
    </a>
  )
}

export default function Videos() {
  const { items, loading } = useCollection('videos')

  return (
    <div>
      <PageHeader
        eyebrow="Watch"
        title="Our Videos"
        subtitle="Reels, ads and promos we've produced for our clients."
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        {loading ? (
          <p className="text-center text-ink/50">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-ink/50">New videos are on the way. 🎬</p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {items.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 0.12}>
                <div className="rounded-2xl overflow-hidden shadow-md bg-white h-full">
                  <div className="aspect-video bg-navy">
                    <VideoPlayer url={v.video_url} />
                  </div>
                  <div className="p-5">
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
