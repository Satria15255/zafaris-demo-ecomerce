import MainLayout from './layout/MainLayout'

import Hero from './pages/Hero'
import BestSeller from './pages/BestSeller'
import DiscountSection from './pages/Discount'
import NewArrival from './pages/NewArrival'

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={
            <div>
              <Hero />
              <BestSeller />
              <DiscountSection />
              <NewArrival />
            </div>
          } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
