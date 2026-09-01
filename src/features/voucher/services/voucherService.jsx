import API from "@/utils/axios";

export const getDiscountVoucher = (data) =>
	API.post("/api/voucher/apply", data);
