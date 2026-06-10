import { Routes, Route } from 'react-router-dom'

// Public site
import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'
import Work from './pages/Work'
import Videos from './pages/Videos'
import Testimonials from './pages/Testimonials'
import Campaigns from './pages/Campaigns'
import Contact from './pages/Contact'

// Admin dashboard
import Login from './admin/Login'
import ProtectedRoute from './admin/ProtectedRoute'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import WorksAdmin from './admin/WorksAdmin'
import ClientsAdmin from './admin/ClientsAdmin'
import PlatformsAdmin from './admin/PlatformsAdmin'
import VideosAdmin from './admin/VideosAdmin'
import CampaignsAdmin from './admin/CampaignsAdmin'
import TestimonialsAdmin from './admin/TestimonialsAdmin'
import SettingsAdmin from './admin/SettingsAdmin'

function App() {
  return (
    <Routes>
      {/* ---------- ADMIN ---------- */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="works" element={<WorksAdmin />} />
        <Route path="clients" element={<ClientsAdmin />} />
        <Route path="platforms" element={<PlatformsAdmin />} />
        <Route path="videos" element={<VideosAdmin />} />
        <Route path="campaigns" element={<CampaignsAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      {/* ---------- PUBLIC ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
