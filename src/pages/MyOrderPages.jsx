import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import { getMyOrders, confirmOrderReceived, cancelOrder } from "../api/Api";
import { toast } from "react-toastify";
import Loader from "../components/Loader"

const OrderPages = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState(6)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({
        status: "All"
    })
    const ordersStatus = ["All", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"]

    const fetchMyOrders = async () => {
        try {

            setLoading(true);
            const res = await getMyOrders();
            setOrders(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
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

    if (loading) {
        return <Loader />
    }


    return (
        <div className="">
            <div>
                {/* Filter Orders */}
                <div className="flex justify-around gap-3 pb-6 border-b border-gray-400 w-full max-w-screen overflow-x-auto">
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
                             px-5 h-[8vh] text-sm lg:text-md rounded-3xl border border-gray-300 hover:bg-black hover:text-white transition duration-300
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
                <div className="w-full h-auto lg:max-h-120 lg:overflow-y-auto">
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
                                    {sortedOrder.length > pagination && (
                                        <p onClick={() => setPagination(pagination + 6)} className="text-sm lg:text-xl hover:underline transition duration-300">View More</p>
                                    )}
                                </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default OrderPages;
