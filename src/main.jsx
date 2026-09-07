import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductModalProvider } from "./context/ProductModalContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoriteProvider>
            <ProductModalProvider>
              <App />
            </ProductModalProvider>
          </FavoriteProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
