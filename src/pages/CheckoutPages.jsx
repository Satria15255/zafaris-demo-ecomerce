import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTransaction, clearCart } from "../api/Api";
import { toast } from "react-toastify";

const CheckoutPage = ({ onClearCart }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const items = useMemo(() => {
        return location.state?.chekoutItems || [];
    }, [location.state])
    // Checkout No Cart Items

    // State untuk form data
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        message: "",
        paymentMethod: "cod",
        shippingMethod: "JNT",
    });

    // Total harga
    const totalPrice = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.finalPrice * item.quantity,
            0
        );
    }, [items]);

    if (items.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                    Back to Shop
                </button>
            </div>
        )
    }

    // Handle perubahan input form
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Submit order
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const products = items.flatMap((item) =>
                Array(item.quantity).fill({
                    product: item.id,
                    size: item.size,
                    price: item.finalPrice,
                    discountPercent: item.discountPercent,
                })
            );

            const payload = {
                products,
                message: formData.message,
                shippingMethod: formData.shippingMethod,
                paymentMethod: formData.paymentMethod,
                shippingAddress: formData.address,
                voucherCode: "",
                status: "pending_confirmation",
            };

            await createTransaction(payload);
            await clearCart();
            onClearCart();
            toast.success("Transaction success");
            navigate("/success-order");
        } catch (error) {
            console.error("Failed to submit order:", error);
            alert("Transaction failed");
        }
    };

    return (
        <div className="mt-16 p-6">
            {items.length === 0 ? (
                <div className="h-4/5 border-t">
                    <p>No Product</p>
                </div>
            ) : (
                <div className="flex w-full">
                    {/* Rincian Cart */}
                    <div className="w-full mb-6 p-8">
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item.id + item.size} className="flex justify-between items-center border-b py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 md:w-20 md:h-20">
                                            <img src={item.image} alt={item.name} className="w-full rounded-lg" />
                                        </div>
                                        <div className=" justify-between">
                                            <p className="font-bold text-xs md:text-lg">{item.name}</p>
                                            <p className="text-gray-500 text-xs md:text-sm">
                                                {item.size} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-yellow-500 font-bold text-xs md:text-lg">$ {(item.finalPrice * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-between text-right font-bold text-sm md:text-lg">
                            <p>Total:</p>
                            <span className="text-yellow-500"> ${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Form Pembeli */}
                    <div className="w-2/5 pt-8">
                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block mb-1 font-medium">Fullname</label>
                                <input type="text" name="name" required onChange={handleChange} className="w-full border placeholder:name px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Address</label>
                                <textarea name="address" required onChange={handleChange} className="w-full border px-3 py-2 rounded"></textarea>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">message</label>
                                <input name="message" value={formData.message} required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">phone</label>
                                <input type="tel" name="phone" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                            </div>

                            {/* Metode Pembayaran */}
                            <div>
                                <label className="block mb-1 font-medium">Shipping Methode</label>
                                <select name="shippingMethod" value={formData.shippingMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                    <option value="JNT">JNT</option>
                                    <option value="JNE">JNE </option>
                                    <option value="TIKI">TIKI</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Payment Methode</label>
                                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                    <option value="cod">Cash On Delivery (COD)</option>
                                    <option value="bank">Transfer </option>
                                    <option value="qris">QRIS</option>
                                </select>
                            </div>

                            {/* Tombol Submit */}
                            <button type="submit" className="bg-black text-white py-2 px-4 rounded right-0 hover:bg-gray-800">
                                Make Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
