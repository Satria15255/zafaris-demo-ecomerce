import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTransaction } from "@/api/Api";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { handleClearCart } = useCart();
    const { user } = useAuth();

    const items = useMemo(() => {
        return location.state?.checkoutItems || [];
    }, [location.state]);

    console.log(user);
    // State untuk form data
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
        message: "",
        paymentMethod: "Transfer",
        shippingMethod: "JNE",
    });

    // Total harga
    const totalPrice = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.finalPrice * item.quantity,
            0,
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
        );
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
                }),
            );

            const payload = {
                products,
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                message: formData.message,
                shippingMethod: formData.shippingMethod,
                paymentMethod: formData.paymentMethod,
                shippingAddress: formData.address,
                voucherCode: "",
                status: "Waiting Confirmation",
            };

            const response = await createTransaction(payload);
            const transactionId = response.data.transaction._id;
            await handleClearCart();
            toast.success("Order success");
            if (formData.paymentMethod === "Cash on Delivery") {
                navigate(`/completed-order/${transactionId}`);
            } else {
                navigate(`/success-order/${transactionId}`);
            }
        } catch (error) {
            console.error("Failed to submit order:", error);
            alert("Transaction failed");
        }
    };

    return (
        <div className="mt-9 md:pt-16 lg:mt-16 p-6 flex justify-center">
            {items.length === 0 ? (
                <div className="h-4/5 border-t">
                    <p>No Product</p>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row pt-2 w-full max-w-7xl">
                    {/* Rincian Cart */}
                    <div className="w-full mb-6 p-2 md:p-8">
                        <p className="text-xl md:text-xl lg:text-lg font-montserrat font-semibold border-b border-gray-500 pb-3">
                            Shopping Cart
                        </p>
                        <table className="w-full">
                            <thead className="border-t border-gray-400 h-4 ">
                                <tr className="my-3 text-gray-400 font-semibold text-sm">
                                    <td className="py-6">PRODUCTS</td>
                                    <td>QUANTITY</td>
                                    <td>TOTAL</td>
                                </tr>
                            </thead>
                            <tbody className="border-t border-gray-400 table-fixed max-h-60 overflow-y-auto">
                                {items.map((item) => {
                                    return (
                                        <tr
                                            key={`${item._id} - ${item.size}`}
                                            className="border-b border-gray-300 table-fixed  "
                                        >
                                            {/* Produk */}
                                            <td className="flex justify-between  items-center py-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-25 h-25 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded mr-1 md:mr-4"
                                                />

                                                <div className="flex flex-col justify-between gap-2  w-full h-full">
                                                    <div>
                                                        <p className="text-sm md:text-lg text-sm max-w-sm font-medium">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-8">
                                                        <p className="text-xs lg:text-sm text-gray-600 font-semibold">
                                                            Size: {item.size}
                                                        </p>
                                                        <div className="flex gap-2 items-center">
                                                            {item.discountPercent >
                                                                0 && (
                                                                <div className="flex gap-2">
                                                                    <p className="text-sm">
                                                                        $
                                                                        {
                                                                            item.discountPercent
                                                                        }
                                                                        OFF
                                                                    </p>
                                                                    <p className="text-sm line-through">
                                                                        $
                                                                        {
                                                                            item.price
                                                                        }
                                                                        .00{" "}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <p className="text-yellow-500 text-sm text-lg font-semibold">
                                                                $
                                                                {
                                                                    item.finalPrice
                                                                }
                                                                .00
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-start">
                                                        <button
                                                            onClick={() =>
                                                                removeCartItems(
                                                                    item
                                                                        .productId
                                                                        ._id,
                                                                    item.size,
                                                                )
                                                            }
                                                            className="text-xs md:text-sm text-gray-500 hover:text-red-500 md:mt-1"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm">
                                                    {item.quantity} x
                                                </p>
                                            </td>
                                            <td>
                                                <div className="flex items-center text-lg justify-center text-left text-yellow-500 font-semibold  hidden md:block">
                                                    $
                                                    {item.finalPrice *
                                                        item.quantity}
                                                    .00
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-between text-right ">
                            <p className="font-bold text-lg md:text-lg">
                                Total:
                            </p>
                            <span className="text-yellow-500 font-bold text-lg md:text-lg">
                                {" "}
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Form Pembeli */}
                    <div className="w-full md:w-3/5 pt-8 bg-black rounded-xl p-4">
                        <p className="text-xl md:text-xl lg:text-3xl text-white pb-4 font-semibold">
                            Order Details
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 text-xs lg:text-lg text-white"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    required
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full border-b bg-black  px-3 py-2 rounded"
                                />
                            </div>

                            <div>
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Your Address"
                                    className="w-full h-12   border-b px-3 rounded"
                                ></input>
                            </div>

                            <div>
                                <input
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message (Optional)"
                                    className="w-full border-b px-3 py-2 rounded"
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    required
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full  border-b px-3 py-2 rounded"
                                />
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-1 text-sm lg:text-lg">
                                    Shipping Method
                                </p>
                                <label className="text-sm lg:text-lg">
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        checked={
                                            formData.shippingMethod === "JNT"
                                        }
                                        onChange={handleChange}
                                        value="JNT"
                                    />
                                    JNT
                                </label>
                                <label className="text-sm lg:text-lg">
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        checked={
                                            formData.shippingMethod === "JNE"
                                        }
                                        onChange={handleChange}
                                        value="JNE"
                                    />
                                    JNE
                                </label>
                                <label className="text-sm lg:text-lg">
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        checked={
                                            formData.shippingMethod === "TIKI"
                                        }
                                        onChange={handleChange}
                                        value="TIKI"
                                    />
                                    TIKI
                                </label>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="mb-1 text-sm lg:text-lg">
                                    Payment Method
                                </p>
                                <label className="text-sm lg:text-lg">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={
                                            formData.paymentMethod ===
                                            "Cash on Delivery"
                                        }
                                        value="Cash on Delivery"
                                        onChange={handleChange}
                                    />{" "}
                                    Cash On Delivery(COD)
                                </label>
                                <label className="text-sm lg:text-lg">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={
                                            formData.paymentMethod ===
                                            "Transfer"
                                        }
                                        value="Transfer"
                                        onChange={handleChange}
                                    />{" "}
                                    Transfer
                                </label>
                            </div>

                            {/* Tombol Submit */}
                            <button
                                type="submit"
                                className="bg-white text-black w-full py-2 text-lg lg:text-xl px-4 rounded-lg  hover:bg-gray-100"
                            >
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
