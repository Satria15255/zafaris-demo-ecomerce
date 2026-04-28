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

import { addToCart, getCart } from "./api/Api";
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";


function App() {
  // User
  const [user, setUser] = useState(null);

  // Clear expired session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Session expired, user logged out.");
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Invalid token, user logged out");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  // Function Add Cart Items
  const handleAddToCart = async (product, selectedSize) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen(false);
      return navigate("/login");
    }

    if (!selectedSize) {
      return toast.info("Please select a size before adding to cart.");
    }

    try {
      const res = await addToCart(product._id, 1, selectedSize);
      console.log("Product add to cart", res.data);
      setCart(res.data);
      fetchCartItems();
      toast.success("Product add to cart");
    } catch (err) {
      console.log("Failed add product", err);
    }
  };

  // Function Open Proudct Modal
  const handleOpenModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

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
              <CallAction />
              <CategoryCollection />
            </div>
          } />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register />} />
          <Route path="/products" element={<ProductsPages onAddToCart={handleAddToCart} onOpenModal={handleOpenModal} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
