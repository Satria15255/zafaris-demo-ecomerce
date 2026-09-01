import API from "@/utils/axios";

// =======================
// 💳 ORDERS
// =======================
export const getMyOrders = () => API.get("/api/transactions/mytransactions");
export const confirmOrderReceived = (Id) =>
    API.patch(`/api/transactions/${Id}/confirm`);
export const cancelOrder = (Id) => API.put(`/api/transactions/cancel/${Id}`);
