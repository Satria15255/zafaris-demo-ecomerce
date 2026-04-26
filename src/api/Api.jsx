import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// ✅ Tambah token otomatis ke setiap request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 🛒 CART
// =======================
export const addToCart = (productId, quantity = 1, size) => API.post("/api/cart/add", { productId, quantity, size });
export const getCart = () => API.get("/api/cart");
export const updateCartQuantity = (productId, size, quantity) => API.put("/api/cart/update", { productId, size, quantity });
export const removeCartItem = (productId, size) => API.delete(`/api/cart/remove/${productId}/${size}`);
export const clearCart = () => API.delete("/api/cart/clear");
// =======================
// 👟 PRODUCTS
// =======================
export const getAllProducts = () => API.get("/api/products");
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const getLatestProducts = () => API.get("/api/products/latest");
export const getBestSellingProducts = () => API.get("/api/products/best-seller");
export const getDiscountProducts = () => API.get("api/products/discounts/today");