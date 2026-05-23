import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import { getMyOrders, confirmOrderReceived, cancelOrder } from "../api/Api";
import { toast } from "react-toastify";

const OrderPages = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(6)
    const [filter, setFilter] = useState({
        status: "All"
    })
    const ordersStatus = ["All", "Waiting for Payment", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"]

    const fetchMyOrders = async () => {
        const res = await getMyOrders();
        setOrders(res.data);
        console.log(res.data);
        if (!orders) {
            return <p>Load Data</p>
        }
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

    // FILTER ORDER
    const filteredOrders = orders.filter((order) => {

        const matchStatus =
            filter.status === "All" ||
            order.status === filter.status;

        return matchStatus;
    });

    // SORT ORDER (NEWEST FIRST)
    const sortedOrder = [...filteredOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );


    return (
        <div className="">
            <div>
                {/* Filter Orders */}
                <div className="flex justify-around gap-3 pb-6 border-b border-gray-400">
                    {ordersStatus.map((ord) => (
                        <button
                            key={ord}
                            onClick={() =>
                                setFilter((prev) => ({
                                    ...prev,
                                    status: ord
                                }))
                            }
                            className={`
                            px-4 w-30 py-1 text-md rounded-3xl border border-gray-300
                            ${filter.status === ord
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                                }
                        `}
                        >
                            {ord}
                        </button>

                    ))}
                </div>

                {/* Order Section */}
                <div className="w-full max-h-120 overflow-y-auto">
                    {sortedOrder.length === 0 ? (
                        <p className="pt-20 text-center">
                            Belum ada order.
                        </p>
                    ) : (
                            <>
                                {sortedOrder.slice(0, pagination).map((order) => (
                                    <OrderDetails order={order} handleCancel={handleCancel} handleConfirm={handleConfirmReceived} />
                                ))}
                                <div className="flex justify-center p-3">
                                    <p onClick={() => setPagination(pagination + 6)} className="text-sm lg:text-xl hover:underline transition duration-300">View More</p>
                                </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default OrderPages;
