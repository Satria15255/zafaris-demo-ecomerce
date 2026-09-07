import API from "@/utils/axios";

export const getFavorites = () => API.get("/api/favorites");
export const addFavorite = (productId) =>
	API.post(`/api/favorites/${productId}`);
export const removeFavorite = (productId) =>
	API.delete(`/api/favorites/${productId}`);
