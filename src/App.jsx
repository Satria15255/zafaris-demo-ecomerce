import MainLayout from './layout/MainLayout'

import Hero from './pages/Hero'
import BestSeller from './pages/BestSeller'

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
            </div>
          } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
