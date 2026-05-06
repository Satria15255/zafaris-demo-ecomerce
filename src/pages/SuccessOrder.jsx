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
        <div className="mt-8 p-2 md:p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-green-600">🎉 Order Success!</h1>

            {latestOrder ? (
                <div className="mb-8 p-4 border rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">🧾 Order Details:</h2>
                    <div className="flex">
                        <div className="w-full">
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
                        </div>

                        <div className="mt-3 w-full">
                            <h3 className="font-semibold">Product:</h3>
                            {latestOrder.products && latestOrder.products.length > 0 ? (
                                <ul className="list-disc list-inside border-t mt-1">
                                    {latestOrder.products.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center mt-3 border-b pb-3">
                                                <div className="flex items-center">
                                                    <img src={item.product.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                                </div>
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-bettween md:flex-row">
                                                    <p className="text-lg md:text-xl font-bold">{item.product.name} </p>
                                                    <div className="flex gap-4">
                                                        <p>
                                                            Size:<span className="font-bold">{item.size}</span>{" "}
                                                        </p>
                                                        <p>
                                                            Quantity: <span className="font-bold">{item.quantity}</span>
                                                        </p>
                                                    </div>
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
