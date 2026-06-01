import MainLayout from './layout/MainLayout'

import Hero from './pages/Hero'
import BestSeller from './pages/BestSeller'
import DiscountSection from './pages/Discount'
import NewArrival from './pages/NewArrival'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductsPages from './pages/ProductPages'
import CallAction from './pages/CallAction'
import CategoryCollection from './pages/CategorySection'
import CheckoutPages from './pages/CheckoutPages'
import SuccessOrderPages from './pages/SuccessOrder'
import PaymentOrderPages from './pages/paymentPages'
import PaymentSuccessPages from './pages/PaymentSuccess'
import OrderPages from './pages/MyOrderPages'
import UserDashboard from './pages/UserDashboard'

import ShoppingCart from './components/ShoppingCart'
import ProductDetail from './components/ProductDetails'
import SidebarProfile from './components/SidebarProfile'
import ScrollToTop from './components/ScrollToTop'

import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'


function App() {
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false)

  return (
    <div>
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route element={<MainLayout handleOpenCart={() => setShoppingCartOpen(true)} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />} >
            <Route path="/" element={
              <div>
                <Hero />
                <BestSeller />
                <DiscountSection />
                <NewArrival />
                <CallAction />
                <CategoryCollection />
              </div>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/products" element={<ProductsPages />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/checkout' element={<CheckoutPages />} />
            <Route path='/success-order/:id' element={<SuccessOrderPages />} />
            <Route path='/paymentOrder/:id' element={<PaymentOrderPages />} />
            <Route path='/completed-order/:id' element={<PaymentSuccessPages />} />
            <Route path='/my-orders' element={<OrderPages />} />
            <Route path='/dashboard' element={<UserDashboard />} />
          </Route>
        </Routes>

        {shoppingCartOpen && <ShoppingCart closeShoppingCart={() => setShoppingCartOpen(false)} />}
        {isSidebarOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
            <SidebarProfile
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </>
        )}
        <ToastContainer position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light" />
      </CartProvider>

    </div>
  )
}

export default App
