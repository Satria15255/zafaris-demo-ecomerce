import API from "@/utils/axios";

// 🛒 CART
// =======================
export const addToCart = (productId, quantity = 1, size) =>
    API.post("/api/cart/add", { productId, quantity, size });
export const getCart = () => API.get("/api/cart");
export const updateCartQuantity = (productId, size, quantity) =>
    API.put("/api/cart/update", { productId, size, quantity });
export const removeCartItem = (productId, size) =>
    API.delete(`/api/cart/remove/${productId}/${size}`);
export const clearCart = () => API.delete("/api/cart/clear");
