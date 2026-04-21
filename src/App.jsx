import MainLayout from './layout/MainLayout'

import Hero from './pages/Hero'

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<Hero />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
