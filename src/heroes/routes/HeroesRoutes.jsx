import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages"

export const HeroesRoutes = () => {
  return (
    <>
    
        <Navbar />

        <div className="container">

          <Routes>
              <Route path="/HeroesApp-SPA/marvel" element={ <MarvelPage />} />
              <Route path="/HeroesApp-SPA/dc" element={ <DcPage />} />

              <Route path="/HeroesApp-SPA/search" element={ <SearchPage />} />
              <Route path="/HeroesApp-SPA/hero/:id" element={ <HeroPage />} />

              <Route path="/HeroesApp-SPA/" element={ <Navigate to="/HeroesApp-SPA/marvel" />} />

          </Routes>

        </div>

    </>
  )
}
