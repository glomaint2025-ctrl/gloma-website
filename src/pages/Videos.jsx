import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

/* 👉 Two easy ways to add videos later:
   1) YouTube/Facebook: paste the EMBED link in `embed`.
   2) Your own file: put it in public/videos and use type:'file', src:'/videos/name.mp4'
*/
const videos = [
  { title: 'Brand Reel — Sample', type: 'placeholder' },
  { title: 'Product Ad — Sample', type: 'placeholder' },
  { title: 'Social Campaign — Sample', type: 'placeholder' },
  { title: 'Promo Video — Sample', type: 'placeholder' },
]

export default function Videos() {
  return (
    <div>
      <PageHeader
        title="Our Videos"
        subtitle="Reels, ads and promos we've produced for our clients."
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid gap-7 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.12}>
              <div className="rounded-2xl overflow-hidden shadow-md bg-white">
                {/* Video player area */}
                <div className="aspect-video bg-navy flex flex-col items-center justify-center text-white/70">
                  <div className="text-5xl mb-2">▶️</div>
                  <p className="text-sm">Video goes here</p>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{v.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
