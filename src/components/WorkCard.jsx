import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'
import VideoPlayer from './VideoPlayer'

const typeBadge = {
  reel: { label: 'Reel', icon: '🎬' },
  ad: { label: 'Ad', icon: '📣' },
  graphic: { label: 'Carousel', icon: '🖼️' },
}

export default function WorkCard({ work }) {
  const [open, setOpen] = useState(false)
  const images = Array.isArray(work.images) ? work.images : []
  const cover = work.image_url || images[0] || ''
  const badge = typeBadge[work.media_type] || typeBadge.graphic

  return (
    <>
      <TiltCard className="cursor-pointer h-full" onClick={() => setOpen(true)}>
        <div
          onClick={() => setOpen(true)}
          className="group relative h-full rounded-2xl overflow-hidden bg-charcoal border border-white/10 shadow-lg"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Cover */}
          <div className="aspect-[4/5] overflow-hidden">
            {cover ? (
              <img src={cover} alt={work.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy-light to-navy grid place-items-center text-white/50 text-sm px-4 text-center">
                {work.title}
              </div>
            )}
          </div>

          {/* Type badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold glass-dark text-white">
            {badge.icon} {badge.label}
          </span>

          {/* Play overlay for video types */}
          {(work.media_type === 'reel' || work.media_type === 'ad') && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-14 w-14 rounded-full bg-white/90 grid place-items-center text-navy text-xl shadow-xl group-hover:scale-110 transition-transform">▶</div>
            </div>
          )}

          {/* Title bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-semibold leading-tight">{work.title}</h3>
            {work.category && <p className="text-white/60 text-xs mt-0.5">{work.category}</p>}
          </div>
        </div>
      </TiltCard>

      {/* Lightbox popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <button onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl">✕</button>

              {work.media_type === 'graphic' && images.length > 0 ? (
                <Carousel images={images} />
              ) : work.video_url ? (
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                  <VideoPlayer url={work.video_url} />
                </div>
              ) : cover ? (
                <img src={cover} alt={work.title} className="w-full rounded-xl" />
              ) : null}

              <div className="mt-4 text-white">
                <h3 className="text-xl font-bold">{work.title}</h3>
                {work.description && <p className="text-white/70 mt-1">{work.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Simple image carousel for graphic posts
function Carousel({ images }) {
  const [i, setI] = useState(0)
  const prev = () => setI((i - 1 + images.length) % images.length)
  const next = () => setI((i + 1) % images.length)
  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <img src={images[i]} alt="" className="w-full max-h-[70vh] object-contain mx-auto" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-navy grid place-items-center">‹</button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-navy grid place-items-center">›</button>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <span key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
