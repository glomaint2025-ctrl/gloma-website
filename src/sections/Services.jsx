import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import IconMesh from '../three/IconMesh'
import { useIsMobile } from '../lib/useIsMobile'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export const services = [
  { title: 'Software & Web Development', desc: 'Custom-built platforms and websites engineered to scale with your business.', shape: 'cube' },
  { title: 'Mobile Apps', desc: 'Native-feel iOS and Android apps that put your brand in every pocket.', shape: 'sphere' },
  { title: 'Social Media Management', desc: 'Data-driven campaigns that turn followers into loyal customers.', shape: 'torus' },
  { title: 'Content Creation', desc: 'Scroll-stopping reels, ads and graphics crafted to make people remember you.', shape: 'cube' },
  { title: 'Advertising & Branding', desc: 'Identity systems and campaigns built to make you unforgettable.', shape: 'sphere' },
  { title: 'IT Solutions', desc: 'Reliable infrastructure and hardware that keep your business powered.', shape: 'torus' },
]

export default function Services() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const pinned = !isMobile && !reducedMotion

  useEffect(() => {
    if (!pinned) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      const scrollDistance = track.scrollWidth - section.offsetWidth

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [pinned])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-24 md:py-0 scroll-mt-20"
    >
      <div className={pinned ? 'md:h-screen md:flex md:items-center' : ''}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          {!pinned && (
            <div className="mb-14">
              <span className="section-label text-white/60">Expertise</span>
              <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Complete Digital <span className="text-gradient-accent">Solutions</span>
              </h2>
            </div>
          )}

          <div
            ref={trackRef}
            className={
              pinned
                ? 'flex gap-6 w-max pr-[10vw]'
                : 'grid gap-6 sm:grid-cols-2'
            }
          >
            {pinned && (
              <div className="w-[70vw] md:w-[36vw] shrink-0 flex flex-col justify-center">
                <span className="section-label text-white/60">Expertise</span>
                <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                  Complete Digital <span className="text-gradient-accent">Solutions</span>
                </h2>
              </div>
            )}

            {services.map((s, i) => {
              const card = (
                <TiltCard className={pinned ? 'w-[78vw] md:w-[26vw] shrink-0' : ''}>
                  <div className="group relative h-full min-h-[320px] rounded-3xl p-7 bg-white/[0.03] border border-white/10 hover:border-[#7C3AED]/50 transition-colors overflow-hidden flex flex-col">
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#7C3AED]/0 group-hover:bg-[#7C3AED]/20 blur-2xl transition-all duration-700" />
                    <span className="absolute top-5 right-6 font-heading font-extrabold text-4xl text-white/5 group-hover:text-[#22D3EE]/30 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="h-16 w-16 mb-5">
                      <IconMesh shape={s.shape} />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-gradient-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </TiltCard>
              )
              return pinned ? (
                <div key={s.title}>{card}</div>
              ) : (
                <Reveal key={s.title} delay={(i % 2) * 0.1}>
                  {card}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
