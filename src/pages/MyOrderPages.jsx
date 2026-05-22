import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import { getMyOrders, confirmOrderReceived, cancelOrder } from "../api/Api";
import { toast } from "react-toastify";

const OrderPages = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(6)

    const fetchMyOrders = async () => {
        const res = await getMyOrders();
        setOrders(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const sortedOrder = orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

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

    if (!Array.isArray(sortedOrder) || sortedOrder.length === 0) return <p>Belum ada order.</p>;

    return (
        <div className="pt-16 mt-13">
            {/* Filter Orders */}
            <div>

            </div>
            <div className="w-full">
                {sortedOrder.slice(0, pagination).map((order) => (
                    <OrderDetails order={order} handleCancel={handleCancel} handleConfirm={handleConfirmReceived} />
                ))}
            </div>
            <div className="flex justify-center p-3">
                <p onClick={() => setPagination(pagination + 6)} className="text-sm lg:text-xl hover:underline transition duration-300">View More</p>
            </div>
        </div>
    );
};

export default OrderPages;
