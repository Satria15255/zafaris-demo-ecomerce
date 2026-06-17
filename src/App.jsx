import MainLayout from "./layout/MainLayout";

import Hero from "./pages/client/Hero";
import BestSeller from "./pages/client/BestSeller";
import DiscountSection from "./pages/client/Discount";
import NewArrival from "./pages/client/NewArrival";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import ProductsPages from "./pages/client/ProductPages";
import CallAction from "./pages/client/CallAction";
import CategoryCollection from "./pages/client/CategorySection";
import CheckoutPages from "./pages/client/CheckoutPages";
import SuccessOrderPages from "./pages/client/SuccessOrder";
import PaymentOrderPages from "./pages/client/paymentPages";
import PaymentSuccessPages from "./pages/client/PaymentSuccess";
import OrderPages from "./pages/client/MyOrderPages";
import UserDashboard from "./pages/client/UserDashboard";

// Pages Admin
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProduct from "./pages/admin/ProductManagement";
import AdminOrder from "./pages/admin/AdminOrders";
import AdminUserList from "./pages/admin/UserList";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ShoppingCart from "./components/client/ShoppingCart";
import ProductDetail from "./components/client/ProductDetails";
import SidebarProfile from "./components/client/SidebarProfile";
import ScrollToTop from "./components/client/ScrollToTop";

import AdminRoute from "./components/admin/AdminRoute";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

function App() {
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route
            element={
              <MainLayout
                handleOpenCart={() => setShoppingCartOpen(true)}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            }
          >
            <Route
              path="/"
              element={
                <div>
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
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<CheckoutPages />} />
            <Route path="/success-order/:id" element={<SuccessOrderPages />} />
            <Route path="/paymentOrder/:id" element={<PaymentOrderPages />} />
            <Route
              path="/completed-order/:id"
              element={<PaymentSuccessPages />}
            />
            <Route path="/my-orders" element={<OrderPages />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/all-orders" element={<AdminOrder />} />
            <Route path="/admin/user" element={<AdminUserList />} />
          </Route>
        </Routes>

        {shoppingCartOpen && (
          <ShoppingCart closeShoppingCart={() => setShoppingCartOpen(false)} />
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
