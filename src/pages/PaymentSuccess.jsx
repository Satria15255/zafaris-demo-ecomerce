import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getTransactionById, getAllProducts } from "../api/Api";
import { FcApproval } from "react-icons/fc";
import { formatDate } from "../utils/FormatedDate"
import { useNavigate, useParams } from "react-router-dom";

const SuccesTransaction = () => {
    const [latestOrder, setlatestOrder] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: order } = await getTransactionById(id);
                setlatestOrder(order);
                console.log("isinya order", order)

                const { data: products } = await getAllProducts();
                const shuffled = products.sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 4));
            } catch (error) {
                console.error("Failed get succes transaction", error);
            }
        };

        fetchData();
    }, []);

    const cashOnDeliveryPayment = latestOrder.paymentMethod === "Cash on Delivery"

    return (
        <div className="mt-16 flex flex-col items-center p-2 md:p-4 ">
            {latestOrder ? (
                <div className="mb-8 p-4 flex flex-col w-4/5 justify-center rounded-lg ">
                    <div className="flex flex-col items-center">
                        <p className="text-8xl"><FcApproval /></p>
                        <p className="text-4xl font-bold pb-3 text-green-600">Thank You</p>
                        {cashOnDeliveryPayment ? (
                            <p className="text-xl font-bold pb-6 text-green-600">Your order has been processed</p>

                        ) : (

                            <p className="text-xl font-bold pb-6 text-green-600">Your payment was successful and your order is being processed.</p>
                        )}
                    </div>
                    {/* Purchase Details */}
                    <div className="flex flex-col justify-center w-full">
                        {/* Product Details\ */}
                        <div className="mt-3 w-full">
                            <p className="font-semibold text-xl border-b pb-4">📦 Product Order:</p>
                            <div className="p-3">
                            {latestOrder.products && latestOrder.products.length > 0 ? (
                                    <ul className="list-disc list-inside  mt-1">
                                    {latestOrder.products.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center mt-3 border-b border-gray-300 pb-3">
                                                <div className="flex items-center w-full">
                                                    <img src={item.image} alt={item.name} className="w-20 h-full object-cover rounded mr-4" />
                                                    <p className="text-lg  w-40 font-semibold">{item.name} </p>
                                                </div>
                                                <div className="flex justify-between gap-4 w-full">
                                                    <p>
                                                        Size:<span className="font-bold">{item.size}</span>{" "}
                                                    </p>
                                                    <p>
                                                        Quantity: <span className="font-bold">{item.quantity}</span>
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
                        </div>
                        {/* Order Details */}
                        <div className="bg-black text-white p-5 rounded-3xl">
                            <div className="mt-3 w-full">
                                <p className="text-xl font-semibold">🧾 Order Details:</p>
                                <div className="p-3">
                                    <p className="flex justify-between">
                                        <span>Order ID:</span>
                                        <p>{latestOrder._id}</p>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Order Time:</span>{new Date(latestOrder.createdAt).toLocaleString()}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Order Status:</span> {latestOrder.status}
                                    </p>
                                </div>
                            </div>
                            {/* Payment Details */}
                            <div className="mt-3 w-full ">
                                <p className="font-semibold text-xl">💳 Payment Details:</p>
                                <div className="p-3">
                                    <p className="flex justify-between">
                                        <span>Total Price:</span> ${latestOrder.totalPrice}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Payment Method:</span> {latestOrder.paymentMethod} {latestOrder.transferProvider}
                                    </p>
                                    {latestOrder.paymentMethod === "Transfer" && (
                                        <>
                                            <p className="flex justify-between">
                                        <span>Payment Status:</span> {latestOrder.paymentStatus}
                                    </p>
                                    <p className="flex justify-between">
                                                <span>Paid  At:</span> {new Date(latestOrder.paidAt).toLocaleString()}
                                    </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Contact Details */}
                            <div className="mt-3 w-full">
                                <p className="font-semibold text-xl">👤 Contact Details:</p>
                                <div className="p-3">
                                    <p className="flex justify-between">
                                        <span>Name :</span> {latestOrder.name}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Address :</span> {latestOrder.shippingAddress}
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Phone Number :</span> {latestOrder.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 md:justify-end md:items-center w-full">
                                <button onClick={() => navigate("/")} className="text-lg  font-semibold h-12 w-1/4 border border-gray-300 rounded-xl hover:bg-white hover:text-black transition duration-300">
                                    Home
                                </button>
                                <button onClick={() => navigate(`/my-orders`)} className="text-lg  text-center font-semibold h-12  w-1/4 border border-gray-300 rounded-xl hover:bg-white hover:text-black transition duration-300">
                                    My Orders
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}


            <div className="mt-8">
                <p className="text-2xl text-center font-semibold pb-4">You Might Like</p>
                <div className="grid grid-cols-2 items-center md:grid-cols-4 gap-3">
                    {recommended.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccesTransaction;
