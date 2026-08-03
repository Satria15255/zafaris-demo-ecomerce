import React, { useEffect, useState } from "react";
import ProductCard from "@/components/client/ProductCard";
import { getTransactionById, getAllProducts } from "@/api/Api";
import { FcApproval } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/client/Loader";

const SuccesTransaction = () => {
    const [latestOrder, setlatestOrder] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: order } = await getTransactionById(id);
                setlatestOrder(order);
                console.log("isinya order", order);

                const { data: products } = await getAllProducts();
                const shuffled = products.sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 4));
            } catch (error) {
                console.error("Failed get succes transaction", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mt-8 md:mt-16 xl:pt-16 p-2 md:p-4 flex flex-col items-center  ">
            {latestOrder ? (
                <div className="mb-8 p-4 flex flex-col rounded-lg w-full max-w-7xl">
                    <div className="flex flex-col items-center">
                        <p className="text-8xl">
                            <FcApproval />
                        </p>
                        <p className="text-3xl font-semibold pb-6 text-green-600 font-montserrat">
                            Your Order is Confirmed! 🎉
                        </p>
                        <p className="text-sm text-gray-600 ">
                            Order ID : {latestOrder._id}
                        </p>
                    </div>
                    {/*Order Updpate*/}
                    <div className="flex flex-col justify-center  border rounded-xl border-gray-200 gap-2 p-3">
                        <p className="font-semibold font-montserrat">
                            Order Updates
                        </p>
                        {latestOrder.paymentMethod === "Cash on Delivery" ? (
                            <p className="text-sm text-gray-600">
                                {" "}
                                Wait for the order process, and check
                                periodically during this time.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                {" "}
                                Make your payment using the navigation button
                                below, and your order will be processed
                                immediately.
                            </p>
                        )}
                    </div>
                    {/*Order Info*/}
                    <div className="flex flex-col justify-center gap-4 border rounded-xl border-gray-200 p-3">
                        <p className="font-semibold font-montserrat">
                            Order Info
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <p className="flex flex-col text-gray-600 ">
                                Order Date:{" "}
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.status}
                                </span>
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Status:
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.status}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Payment Method:
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.paymentMethod}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Payment Status:
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.paymentStatus}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Phone Number:
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.phoneNumber}
                                </span>{" "}
                            </p>
                            <p className="flex flex-col text-gray-600 ">
                                Address:
                                <span className="font-ysabeau text-black font-bold text-xl">
                                    {latestOrder.shippingAddress}
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                    {/* Order Details */}
                    <div className="flex flex-col w-full border border-gray-200 p-5 rounded-xl">
                        <p className="text-xl w-full font-semibold mb-2">
                            🧾 Order Details:
                        </p>
                        <div className="mt-3 w-full p-3 ">
                            <p className="font-semibold">Product:</p>
                            {latestOrder.products &&
                            latestOrder.products.length > 0 ? (
                                <ul className="list-disc list-inside border-t mt-1">
                                    {latestOrder.products.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center mt-3 border-b border-gray-300 pb-3">
                                                <div className="flex items-center  w-full">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-20 h-full object-cover rounded mr-4"
                                                    />
                                                    <p className="text-md w-30 md:w-40 font-semibold">
                                                        {item.name}{" "}
                                                    </p>
                                                </div>
                                                <div className="md:hidden w-20">
                                                    <p className="text-gray-600 xt-sm">
                                                        {item.size} x{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="hidden md:flex justify-between gap-4 w-full">
                                                    <p>
                                                        Size:
                                                        <span className="font-bold">
                                                            {item.size}
                                                        </span>{" "}
                                                    </p>
                                                    <p>
                                                        Quantity:{" "}
                                                        <span className="font-bold">
                                                            {item.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <p>No product</p>
                            )}
                        </div>
                        <div className="w-full p-3 flex flex-col gap-3">
                            <p className="flex justify-between">
                                <span>Order Id:</span>
                                <p>{latestOrder._id}</p>
                            </p>
                            <p className="flex justify-between">
                                <span>Status:</span> {latestOrder.status}
                            </p>
                            <p className="flex justify-between">
                                <span>Total Price:</span> $
                                {latestOrder.totalPrice}
                            </p>
                            <p className="flex h-auto justify-between">
                                <span>Address:</span>{" "}
                                {latestOrder.shippingAddress}
                            </p>
                            <p className="flex justify-between">
                                <span>Payment Method:</span>{" "}
                                {latestOrder.paymentMethod}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 md:justify-end md:items-center w-full mt-5">
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm lg:text-lg font-semibold h-12 w-full md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white"
                        >
                            My Orders
                        </button>
                        <button
                            onClick={() =>
                                navigate(`/paymentOrder/${latestOrder._id}`)
                            }
                            className="text-sm lg:text-lg font-semibold h-12 w-full md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white"
                        >
                            Paid Now
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}

            <div className="mt-8 max-w-7xl">
                <h2 className="text-sm text-center lg:text-xl font-bold mb-4">
                    You Might Like
                </h2>
                <div className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-3">
                    {recommended.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccesTransaction;
