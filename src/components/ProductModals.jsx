import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductModal({ product, onClose, onAddToCart }) {
    const { discountPercent, discountPrice } = product;
    const [selectedSize, setSelectedSize] = useState("");
    const navigate = useNavigate();

    const isDiscount = discountPercent && discountPrice;

    // Fungsi Checkout product
    const handleChekoutNow = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            onClose();
            navigate("/login");
            return;
        }
        if (!selectedSize) {
            toast.warning("Please select a size before adding to cart.");
            return;
        } else {
            onClose();
        }

        const finalPrice = product.discountPercent > 0 ? product.price - (product.price * product.discountPercent) / 100 : product.price;

        const selectedItem = {
            id: product._id,
            name: product.name,
            image: product.image,
            size: selectedSize,
            finalPrice,
            originalPrice: product.price,
            discountPercent: product.discountPercent,
            quantity: 1,
        };

        navigate("/chekout", { state: { chekoutItems: [selectedItem] } });
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 bg-gray-800 bg-opacity-20">
            <div className="bg-white p-6 rounded-lg w-full h-full md:w-4/5 md:h-auto flex-row md:flex-col items-center overflow-y-auto">
                <div>
                    <div className="flex flex-row md:hidden justify-between">
                        <h2 className="lg:text-3xl md:text-lg pb-4 lg:pb-4 font-bold w-full border-bottom ">{product.name}</h2>
                        <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
                            ×
                        </button>
                    </div>
                    <div className="flex justify-center items-center md:items-start">
                        <img src={product.image} alt={product.name} className=" md:w-full h-auto object-cover flex justify-center items-center rounded-md mt-2" />
                    </div>
                    <div className="flex justify-arround flex-col">
                        <div className="flex flex-row justify-between hidden md:flex">
                            <h2 className="lg:text-3xl md:text-lg pb-3 lg:pb-4 font-bold w-full border-bottom ">{product.name}</h2>
                            <button onClick={onClose} className="text-gray-500 -mt-6 text-lg hover:text-gray-700 top-0">
                                ×
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center">
                                {isDiscount ? (
                                    <div className="flex gap-2">
                                        <p className="text-sm lg:text-lg font-bold line-through">${product.price.toFixed(2)}</p>
                                        <p className="text-sm lg:text-lg text-yellow-500 font-bold">${discountPrice.toFixed(2)}</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm lg:text-lg text-yellow-500 font-bold">${product.price.toFixed(2)}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="py-3 text-sm lg:text-lg border-bottom w-full ">{product.description}</p>
                        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border px-2 py-1 rounded" required>
                            <option value="">Pilih Ukuran</option>
                            {product.sizes.map((size) => {
                                return (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="mt-auto flex flex-col justify-arround hidden xl:flex items-end ">
                            <button onClick={() => onAddToCart(product, selectedSize, discountPrice)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    handleChekoutNow();
                                    // closed();
                                }}
                                className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition"
                            >
                                Chekout
                            </button>
                        </div>
                    </div>
                    <div className="mt-auto flex flex-col justify-arround xl:hidden items-end ">
                        <button onClick={() => onAddToCart(product, selectedSize)} className="mt-3 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                handleChekoutNow();
                            }}
                            className="mt-2 w-full px-2 py-3 bg-gray-200  hover:text-white rounded-md hover:bg-black transition"
                        >
                            Chekout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
