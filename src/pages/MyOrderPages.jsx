import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import { getMyOrders, confirmOrderReceived, cancelOrder } from "../api/Api";
import { toast } from "react-toastify";

const OrderPages = () => {
    const [orders, setOrders] = useState([]);

    const fetchMyOrders = async () => {
        const res = await getMyOrders();
        setOrders(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleConfirmReceived = async (id) => {
        try {
            await confirmOrderReceived(id);
            toast.success("Order confirmed successfully");
            fetchMyOrders();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to confirm order");
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelOrder(id);
            toast.success("Order cancel successfully");
            fetchMyOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed canceled order");
        }
    };

    return (
        <div className="mt-10 md:mt-16 pt-10">
            <OrderDetails order={orders} handleCancel={handleCancel} handleConfirm={handleConfirmReceived} />
        </div>
    );
};

export default OrderPages;
