import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

// The wrapper for all PUBLIC pages: top bar, page, footer.
export default function PublicLayout() {
  const location = useLocation()

  // On navigation: jump to the #section if there is one, else go to top
  useEffect(() => {
    if (location.hash) {
      // wait one tick so the page has rendered
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
