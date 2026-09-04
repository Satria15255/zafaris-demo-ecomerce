import API from "@/utils/axios";

// =======================
// 👟 PRODUCTS
// =======================
export const getAllProducts = () => API.get("/api/products");
export const getProductById = (id) => API.get(`/api/products/${id}`);
export const getLatestProducts = () => API.get("/api/products/latest");
export const getBestSellingProducts = () =>
	API.get("/api/products/best-seller");
export const getDiscountProducts = () =>
	API.get("api/products/discounts/today");
export const getProductSearch = (query) =>
	API.get(`/api/products?search=${encodeURIComponent(query)}`);
