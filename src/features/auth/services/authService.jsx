import API from "@/utils/axios";

// 👤 AUTH
// =======================
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);
export const getUserProfile = () => API.get(`/api/auth/user/profile`);
export const updateProfile = (data) => API.put("/api/auth/user/profile", data);
export const changePassword = (data) =>
	API.put("/api/auth/user/change-password", data);
