// Layout
import AdminLayout from "@/layout/AdminLayout";
import MainLayout from "@/layout/MainLayout";

// Home Section
import Hero from "@/pages/public/home/sections/Hero";
import CallAction from "@/pages/public/home/sections/CallAction";
import BestSeller from "@/pages/public/home/sections/BestSeller";
import DiscountSection from "@/pages/public/home/sections/Discount";
import NewArrival from "@/pages/public/home/sections/NewArrival";
import CategoryCollection from "@/pages/public/home/sections/CategorySection";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Admin Auth
import AdminRoute from "@/components/admin/route/AdminRoute";
import AdminLogin from "@/pages/auth/AdminLoginPage";

// Products
import ProductsPages from "@/pages/public/products/ProductPages";
import ProductDetail from "@/pages/public/productDetails/ProductDetails";
import SearchPages from "@/pages/public/products/SearchProduct";

// Cart
import ShoppingCartPages from "@/features/cart/components/ShoppingCart";
import SidebarCart from "@/features/cart/components/SidebarCart";

// Context
import { CartProvider } from "./context/CartContext";

// Orders
import SuccessOrderPages from "@/features/orders/components/SuccessOrder";
import OrderPages from "@/pages/customer/MyOrderPages";

// Customer
import UserDashboard from "@/pages/customer/UserDashboard";
import SidebarProfile from "@/components/layout/SidebarProfile";

// Transaction / Orders
import CheckoutPages from "@/features/orders/components/CheckoutPages";
import PaymentOrderPages from "@/features/payment/components/paymentPages";
import PaymentSuccessPages from "@/features/payment/components/PaymentSuccess";

// Pages Admin
import AdminProduct from "@/pages/admin/products/ProductManagement";
import AdminOrder from "@/pages/admin/orders/AdminOrders";
import AdminUserList from "@/pages/admin/users/AdminUserList";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";

// Common
import ScrollToTop from "@/components/common/ScrollToTop";

// Tools
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCartOpen, setSidebarCartOpen] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route
            element={
              <MainLayout
                handleOpenCart={() => setSidebarCartOpen(true)}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            }
          >
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center overflow-hidden">
                  <Hero />
                  <BestSeller />
                  <DiscountSection />
                  <NewArrival />
                  <CallAction />
                  <CategoryCollection />
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsPages />} />
            <Route path="/search" element={<SearchPages />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/my-cart" element={<ShoppingCartPages />} />
            <Route path="/checkout" element={<CheckoutPages />} />
            <Route path="/success-order/:id" element={<SuccessOrderPages />} />
            <Route path="/paymentOrder/:id" element={<PaymentOrderPages />} />
            <Route
              path="/payment-success/:id"
              element={<PaymentSuccessPages />}
            />
            <Route path="/my-orders" element={<OrderPages />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/all-orders" element={<AdminOrder />} />
            <Route path="/admin/user" element={<AdminUserList />} />
          </Route>
        </Routes>

        {sidebarCartOpen && (
          <SidebarCart closeSidebarCart={() => setSidebarCartOpen(false)} />
        )}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <SidebarProfile closeSidebar={() => setIsSidebarOpen(false)} />
          </>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </CartProvider>
    </div>
  );
}

export default App;
