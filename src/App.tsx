import { useEffect } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { BrandPage } from "@/pages/BrandPage"
import { HomePage } from "@/pages/HomePage"
import { InfluencerPage } from "@/pages/InfluencerPage"
import { ROUTES } from "@/config/links"

/** Start each page at the top (or at its #hash target) after navigation. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      {/* overflow-x-clip guards very narrow screens (< 360px) where the
          fixed-size phone mockups would otherwise widen the page. */}
      <div className="w-full overflow-x-clip bg-white font-sans break-keep text-ink">
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.brand} element={<BrandPage />} />
          <Route path={ROUTES.influencer} element={<InfluencerPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
