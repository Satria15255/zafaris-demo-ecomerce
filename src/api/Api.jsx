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


// =======================
// 👟 PRODUCTS
// =======================
export const getAllProducts = () => API.get("/api/products");
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const getLatestProducts = () => API.get("/api/products/latest");
export const getBestSellingProducts = () => API.get("/api/products/best-seller");
export const getDiscountProducts = () => API.get("api/products/discounts/today");