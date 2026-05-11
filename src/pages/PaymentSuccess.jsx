import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getTransactionById, getAllProducts } from "../api/Api";
import { FcApproval } from "react-icons/fc";
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

    return (
        <div className="mt-16 flex flex-col items-center p-2 md:p-4 ">
            {latestOrder ? (
                <div className="mb-8 p-4 flex flex-col w-4/5 justify-center rounded-lg ">
                    <div className="flex flex-col items-center">
                        <p className="text-8xl"><FcApproval /></p>
                        <p className="text-4xl font-bold pb-3 text-green-600">Thank You</p>
                        <p className="text-xl font-bold pb-6 text-green-600">Your Order Payment has been Successful</p>
                    </div>
                    {/* Purchase Details */}
                    <div className="flex flex-col justify-center w-full">
                        <p className="text-xl w-full font-semibold mb-2">🧾 Purchase Details:</p>
                        {/* Product Details\ */}
                        <div className="mt-3 w-full p-3">
                            <p className="font-semibold">Product:</p>
                            {latestOrder.products && latestOrder.products.length > 0 ? (
                                <ul className="list-disc list-inside border-t mt-1">
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
                        {/* Order Details */}
                        <div className="mt-3 w-full p-3">
                            <p className="font-semibold">Order Details:</p>
                            <p className="flex justify-between">
                                <strong>Order ID:</strong>
                                <p>{latestOrder._id}</p>
                            </p>
                            <p className="flex justify-between">
                                <strong>Order Time:</strong> {latestOrder.createdAt}
                            </p>
                            <p className="flex justify-between">
                                <strong>Order Status:</strong> {latestOrder.status}
                            </p>
                        </div>
                        {/* Payment Details */}
                        <div className="mt-3 w-full p-3">
                            <p className="font-semibold">Payment Details:</p>
                            <p className="flex justify-between">
                                <strong>Total Price:</strong> ${latestOrder.totalPrice}
                            </p>
                            <p className="flex justify-between">
                                <strong>Payment Method:</strong> {latestOrder.paymentMethod} ({latestOrder.transferProvider})
                            </p>
                            <p className="flex justify-between">
                                <strong>Payment Status:</strong> {latestOrder.paymentStatus}
                            </p>
                            <p className="flex justify-between">
                                <strong>Paid  At:</strong> {latestOrder.paidAt}
                            </p>
                        </div>
                        {/* Contact Details */}
                        <div className="mt-3 w-full p-3">
                            <p className="font-semibold">Contact Details:</p>
                            <p className="flex justify-between">
                                <strong>Address:</strong> {latestOrder.shippingAddress}
                            </p>
                            
                        </div>
                    </div>

                    <div className="flex gap-4 md:justify-end md:items-center w-full">
                        <button onClick={() => navigate("/")} className="text-lg font-semibold h-12 w-full w-1/2 border border-gray-300 rounded-xl hover:bg-black hover:text-white">
                            Home
                        </button>
                        <button onClick={() => navigate(`/my-orders`)} className="text-lg font-semibold h-12 w-full w-1/2 border border-gray-300 rounded-xl hover:bg-black hover:text-white">
                            My Orders
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}


            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recommended Products for You</h2>
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
