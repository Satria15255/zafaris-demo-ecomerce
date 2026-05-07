import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getNewTransactions, getAllProducts } from "../api/Api";
import { useNavigate } from "react-router-dom";

const SuccesTransaction = () => {
    const [latestOrder, setlatestOrder] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: order } = await getNewTransactions();
                setlatestOrder(order);

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
        <div className="mt-16 p-2 md:p-4 ">
            <p className="text-4xl font-bold pb-6 text-green-600">🎉 Order Success!</p>

            {latestOrder ? (
                <div className="mb-8 p-4 border flex rounded-lg shadow">
                    {/* Order Details */}
                    <div className="flex flex-col w-4/5">
                        <p className="text-xl w-full font-semibold mb-2">🧾 Order Details:</p>
                        <div className="mt-3 w-full p-3">
                            <p className="font-semibold">Product:</p>
                            {latestOrder.products && latestOrder.products.length > 0 ? (
                                <ul className="list-disc list-inside border-t mt-1">
                                    {latestOrder.products.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center mt-3 border-b border-gray-300 pb-3">
                                                <div className="flex items-center w-full">
                                                    <img src={item.product.image} alt={item.name} className="w-20 h-full object-cover rounded mr-4" />
                                                    <p className="text-lg  w-40 font-semibold">{item.product.name} </p>
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
                        <div className="w-full p-3">
                            <p className="flex justify-between">
                                <strong>ID Transaction:</strong>
                                <p>{latestOrder._id}</p>
                            </p>
                            <p className="flex justify-between">
                                <strong>Status:</strong> {latestOrder.status}
                            </p>
                            <p className="flex justify-between">
                                <strong>Total Price:</strong> ${latestOrder.totalPrice}
                            </p>
                            <p className="flex justify-between">
                                <strong>Address:</strong> {latestOrder.shippingAddress}
                            </p>
                            <p className="flex justify-between">
                                <strong>Payment Method:</strong> {latestOrder.paymentMethod}
                            </p>
                        </div>
                    </div>


                    {/* Payment Details */}
                    <div className="bg-black w-2/5 h-150 flex flex-col justify-around p-4 text-white rounded-xl">
                        <p className="text-xl w-full font-semibold mb-2">🧾 Payment Details:</p>
                        <div className="mt-5 p-4">
                            <p className="text-lg ">Transfer Method</p>
                            <div className="flex justify-center gap-5 mt-3">
                                <button className="rounded-full h-12 w-1/2 border border-gray-700 hover:bg-gray-600 transition duration-300">Paypal</button>
                                <button className="rounded-full h-12 w-1/2 border border-gray-700 hover:bg-gray-600 transition duration-300">Wise</button>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-around space-y-5">
                            <div>
                                <input type="text" name="Card Name" required placeholder="Your Card Name" className="w-full border-b bg-black text-lg px-3 py-2 rounded" />
                            </div>

                            <div>
                                <input name="Card Number" required placeholder="Card Number" className="w-full h-12 text-lg border-b px-3 rounded" />
                            </div>

                            <div>
                                <input name="CVV" required placeholder="CVV" className="w-full border-b text-lg px-3 py-2 rounded" />
                            </div>

                            <div>
                                <input type="text" name="Expired Date" required placeholder="Expired Date" className="w-full text-lg border-b px-3 py-2 rounded" />
                            </div>
                        </div>
                        <button type="submit" className="bg-white text-black w-full py-2 text-xl px-4 rounded-lg  hover:bg-gray-100">
                            Paid Now
                        </button>
                    </div>



                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}
            <div className="flex md:justify-end md:items-center w-full">
                <button onClick={() => navigate("/")} className="text-lg font-semibold h-10 w-full md:w-1/5 border rounded-xl hover:bg-black hover:text-white">
                    Back to Home
                </button>
            </div>

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
