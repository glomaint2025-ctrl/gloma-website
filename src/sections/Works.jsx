import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/Reveal'
import VideoPlayer from '../components/VideoPlayer'
import { useCollection } from '../lib/useCollection'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Elegant placeholders until real projects are added in /admin — same shape
// as a real `works` row, so swapping in real media needs no code changes.
const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  category: 'Coming soon',
  placeholder: true,
}))

export default function Works() {
  const { items } = useCollection('works')
  const works = items.length > 0 ? items.slice(0, 6) : placeholders
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="relative py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="mb-16">
            <span className="section-label text-white/60">Selected Work</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Work That <span className="text-gradient-accent">Speaks</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-20 md:space-y-32">
          {works.map((w, i) => (
            <WorkRow key={w.id} work={w} index={i} onOpen={() => !w.placeholder && setActive(w)} />
          ))}
        </div>

        {items.length > 6 && (
          <div className="text-center mt-16">
            <Link
              to="/work"
              className="inline-block px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View All Work →
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>{active && <WorkLightbox work={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}

function WorkRow({ work, index, onOpen }) {
  const imgRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const reversed = index % 2 === 1
  const cover = work.image_url || (Array.isArray(work.images) ? work.images[0] : '')

  useEffect(() => {
    if (reducedMotion || !imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <Reveal direction={reversed ? 'left' : 'right'}>
      <div className={`grid gap-8 md:grid-cols-2 items-center ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div
          data-cursor="view"
          onClick={onOpen}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] cursor-pointer"
        >
          {cover ? (
            <img ref={imgRef} src={cover} alt={work.title} className="w-full h-full object-cover" />
          ) : (
            <div
              ref={imgRef}
              className="w-full h-full grid place-items-center bg-gradient-to-br from-[#7C3AED]/20 to-[#22D3EE]/10"
            >
              <span className="text-white/30 text-6xl font-heading font-extrabold">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-[#22D3EE]">{work.category || 'Project'}</span>
          <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">{work.title}</h3>
          {work.description && <p className="mt-3 text-white/60 leading-relaxed max-w-md">{work.description}</p>}
        </div>
      </div>
    </Reveal>
  )
}

function WorkLightbox({ work, onClose }) {
  const images = Array.isArray(work.images) ? work.images : []
  const cover = work.image_url || images[0] || ''
  const [i, setI] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm grid place-items-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl"
      >
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl">
          ✕
        </button>

        {work.video_url ? (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden">
            <VideoPlayer url={work.video_url} />
          </div>
        ) : images.length > 0 ? (
          <div className="relative bg-black rounded-2xl overflow-hidden">
            <img src={images[i]} alt="" className="w-full max-h-[70vh] object-contain mx-auto" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setI((i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-black grid place-items-center"
                >
                  ‹
                </button>
                <button
                  onClick={() => setI((i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-black grid place-items-center"
                >
                  ›
                </button>
              </>
            )}
          </div>
        ) : cover ? (
          <img src={cover} alt={work.title} className="w-full rounded-2xl" />
        ) : null}

        <div className="mt-4 text-white">
          <h3 className="text-xl font-bold">{work.title}</h3>
          {work.description && <p className="text-white/70 mt-1">{work.description}</p>}
        </div>
      </motion.div>
    </motion.div>
  )
}
