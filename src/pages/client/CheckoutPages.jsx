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

    console.log(items);

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
                    <div className="w-full md:w-1/2 lg:w-2/5 mb-6 p-2 md:p-8">
                        <p className="text-xl md:text-xl lg:text-lg font-montserrat font-semibold border-b border-gray-500 pb-3">
                            Shopping Cart
                        </p>
                        <table className="w-full">
                            <thead className="hidden lg:table-header-group border-t border-gray-400 h-4 ">
                                <tr className="my-3 text-gray-400 font-semibold text-sm">
                                    <td className="py-6">PRODUCTS</td>
                                    <td>QUANTITY</td>
                                    <td>TOTAL</td>
                                </tr>
                            </thead>
                            <tbody className="md:border-t border-gray-400 table-fixed max-h-60 overflow-y-auto">
                                {items.map((item) => {
                                    return (
                                        <tr
                                            key={`${item.id} - ${item.size}`}
                                            className="border-b border-gray-300 table-fixed  "
                                        >
                                            {/* Produk */}
                                            <td className="flex justify-between  items-center py-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-25 h-25 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded mr-1 md:mr-4"
                                                />
                                                {/*Proeduct details desktop*/}
                                                <div className="flex flex-col justify-between gap-2  w-full h-full">
                                                    <div>
                                                        <p className="text-sm md:text-lg text-sm  font-medium">
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
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-sm">
                                                    {item.quantity} x
                                                </p>
                                            </td>
                                            <td>
                                                <div className="flex items-center text-lg justify-center text-left text-yellow-500 font-semibold  hidden lg:block">
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
                    <div className="w-full md:w-1/2 lg:w-3/5 pt-8 bg-gray-100 rounded-xl p-4">
                        <p className="text-xl md:text-xl lg:text-lg font-semibold font-montserrat  pb-4 font-semibold">
                            Order Details
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 text-md md:text-xs lg:text-lg "
                        >
                            <div>
                                <label className="font-semibold font-montserat" />
                                Username
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    required
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full  bg-white  px-3 py-1 rounded font-ysabeau"
                                />
                            </div>

                            <div>
                                <label className="font-semibold font-montserat" />
                                Address
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Your Address"
                                    className="w-full bg-white py-1 px-3 font-ysabeau  rounded"
                                ></input>
                            </div>

                            <div>
                                <label className="font-semibold font-montserat" />
                                Optional Message
                                <input
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message (Optional)"
                                    className="w-full bg-white px-3 py-1 font-ysabeau rounded"
                                />
                            </div>

                            <div>
                                <label className="font-semibold font-montserat" />
                                Phone Number
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    required
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full bg-white px-3 py-1 font-ysabeau rounded"
                                />
                            </div>

                            {/* Metode Pembayaran */}
                            <div className="flex flex-col gap-2">
                                <p className="mb-1 text-sm lg:text-lg">
                                    Shipping Method
                                </p>
                                <label
                                    className="font-semibold font-montserat"
                                    className="text-sm lg:text-lg"
                                >
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
                                <label
                                    className="font-semibold font-montserat"
                                    className="text-sm lg:text-lg"
                                >
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
                                <label
                                    className="font-semibold font-montserat"
                                    className="text-sm lg:text-lg"
                                >
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
                                <label
                                    className="font-semibold font-montserat"
                                    className="text-sm lg:text-lg"
                                >
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
                                <label
                                    className="font-semibold font-montserat"
                                    className="text-sm lg:text-lg"
                                >
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
                                className="bg-[#0C0C0C] text-white w-full py-2 text-lg lg:text-xl px-4 rounded-lg  hover:bg-gray-100 hover:bg-white hover:text-black hover:bg-gray-200 transition duration-200"
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
