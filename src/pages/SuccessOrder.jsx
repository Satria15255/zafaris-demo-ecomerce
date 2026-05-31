import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getTransactionById, getAllProducts } from "../api/Api";
import { FcApproval } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader"

const SuccesTransaction = () => {
    const [latestOrder, setlatestOrder] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data: order } = await getTransactionById(id);
                setlatestOrder(order);
                console.log("isinya order", order)

                const { data: products } = await getAllProducts();
                const shuffled = products.sort(() => 0.5 - Math.random());
                setRecommended(shuffled.slice(0, 4));
            } catch (error) {
                console.error("Failed get succes transaction", error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mt-8 md:mt-16 p-2 md:p-4 ">
            {latestOrder ? (
                <div className="mb-8 p-4 flex flex-col rounded-lg ">
                    <div className="flex flex-col items-center">
                        <p className="text-8xl"><FcApproval /></p>
                        <p className="text-4xl font-bold pb-6 text-green-600">Order Success! 🎉</p>
                    </div>
                    {/* Order Details */}
                    <div className="flex flex-col w-full">
                        <p className="text-xl w-full font-semibold mb-2">🧾 Order Details:</p>
                        <div className="mt-3 w-full p-3 ">
                            <p className="font-semibold">Product:</p>
                            {latestOrder.products && latestOrder.products.length > 0 ? (
                                <ul className="list-disc list-inside border-t mt-1">
                                    {latestOrder.products.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center mt-3 border-b border-gray-300 pb-3">
                                                <div className="flex items-center  w-full">
                                                    <img src={item.image} alt={item.name} className="w-20 h-full object-cover rounded mr-4" />
                                                    <p className="text-md w-30 md:w-40 font-semibold">{item.name} </p>
                                                </div>
                                                <div className="md:hidden w-20">
                                                    <p className="text-gray-500 text-md md:text-sm">
                                                        {item.size} x {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="hidden md:flex justify-between gap-4 w-full">
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
                        <div className="w-full p-3 flex flex-col gap-3">
                            <p className="flex justify-between">
                                <strong>Order Id:</strong>
                                <p>{latestOrder._id}</p>
                            </p>
                            <p className="flex justify-between">
                                <strong>Status:</strong> {latestOrder.status}
                            </p>
                            <p className="flex justify-between">
                                <strong>Total Price:</strong> ${latestOrder.totalPrice}
                            </p>
                            <p className="flex h-auto justify-between">
                                <strong>Address:</strong> {latestOrder.shippingAddress}
                            </p>
                            <p className="flex justify-between">
                                <strong>Payment Method:</strong> {latestOrder.paymentMethod}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 md:justify-end md:items-center w-full mt-5">
                        <button onClick={() => navigate("/")} className="text-sm lg:text-lg font-semibold h-12 w-full md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white">
                            My Orders
                        </button>
                        <button onClick={() => navigate(`/paymentOrder/${latestOrder._id}`)} className="text-sm lg:text-lg font-semibold h-12 w-full md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white">
                            Paid Now
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}


            <div className="mt-8">
                <h2 className="text-sm text-center lg:text-xl font-bold mb-4">You Might Like</h2>
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
