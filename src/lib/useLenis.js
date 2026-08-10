import { useEffect } from 'react'
import { initLenis, destroyLenis } from './lenis'
import { useIsMobile } from './useIsMobile'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Mounted once (in PublicLayout) to drive buttery smooth scroll everywhere.
// Skipped on touch devices and under prefers-reduced-motion — native scroll
// behaves better there and costs nothing to run.
export function useLenis() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const enabled = !isMobile && !reducedMotion

  useEffect(() => {
    if (!enabled) return
    initLenis()
    return () => destroyLenis()
  }, [enabled])
}
