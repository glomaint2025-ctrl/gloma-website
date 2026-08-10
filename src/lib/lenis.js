// Singleton Lenis instance wired to GSAP's ticker/ScrollTrigger, shared by
// useLenis (which owns its lifecycle) and anything that wants scroll velocity
// (e.g. MarqueeStrip).
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafFn = null

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({ duration: 1.2, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)

  rafFn = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(rafFn)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroyLenis() {
  if (!lenis) return
  gsap.ticker.remove(rafFn)
  lenis.destroy()
  lenis = null
  rafFn = null
}

export function getLenis() {
  return lenis
}
