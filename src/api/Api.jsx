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

// 👤 AUTH
// =======================
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);
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

// =======================
// 💳 TRANSACTIONS
// =======================
export const createTransaction = (data) => API.post("/api/transactions", data);
export const getAllTransactions = () => API.get("/api/transactions");
export const updateTransactionStatus = (orderId, newStatus) => API.put(`/api/transactions/${orderId}/status`, { status: newStatus });
export const getTransactionById = (id) => API.get(`/api/transactions/${id}`)
export const payTransaction = (id) => API.patch(`/api/transactions/${id}/payment`)
