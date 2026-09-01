import API from "@/utils/axios";

export const createTransaction = (data) => API.post("/api/transactions", data);
export const getTransactionById = (id) => API.get(`/api/transactions/${id}`);
export const payTransaction = (id, data) =>
	API.patch(`/api/transactions/${id}/payment`, data);
