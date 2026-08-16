import { useEffect, useState } from "react";
import ProductCard from "@/components/client/ProductCard";
import { getTransactionById, getAllProducts, payTransaction } from "@/api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/client/Loader";

import visa from "@/assets/logo/visa.svg";
import mastercard from "@/assets/logo/mastercard.svg";

import { FaCcMastercard, FaCcVisa } from "react-icons/fa";

const PaymentPages = () => {
    const [latestOrder, setLatestOrder] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState("Visa");
    const [timeLeft, setTimeLeft] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [paymentData, setPaymentData] = useState({
        cardName: "",
        cardNumber: "",
        cvv: "",
        expiredMonth: "",
        expiredYear: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: order } = await getTransactionById(id);
                setLatestOrder(order);
                console.log("isi order", order);

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
    }, [id]);

    useEffect(() => {
        if (!latestOrder?.paymentExpiredAt) return;

        const interval = setInterval(() => {
            const now = new Date();
            const expired = new Date(latestOrder.paymentExpiredAt);

            const diff = expired - now;

            if (diff <= 0) {
                setTimeLeft("Payment Expired");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [latestOrder]);

    const handleChange = (e) => {
        setPaymentData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePayment = async () => {
        try {
            if (
                !paymentData.cardName ||
                !paymentData.cardNumber ||
                !paymentData.cvv ||
                !paymentData.expiredMonth ||
                !paymentData.expiredYear
            ) {
                return alert("Please complete payment form");
            }

            await payTransaction(latestOrder._id, {
                transferProvider: selectedTransfer,
            });
            toast.success("Payment Success!!");
            navigate(`/completed-order/${latestOrder._id}`);
        } catch (error) {
            console.log(error.message);
            console.log(error.response);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mt-8 md:mt-16 xl:pt-16 p-2 md:p-4 flex flex-col items-center ">
            <p className="text-xl lg:text-4xl py-8 font-semibold font-montserrat  ">
                Complete Your Payment 💳
            </p>

            {latestOrder ? (
                <div className="mb-8 lg:p-4 xl:p-2 flex flex-col md:flex-row rounded-lg w-full max-w-7xl">
                    {/* Order Details */}
                    <div className="flex flex-col w-full md:w-1/2 lg:w-3/5  ">
                        <p className="text-xl w-full font-semibold mb-2">
                            🧾 Order Details:
                        </p>
                        <div className="h-auto flex flex-col justify-between">
                            <div className="mt-3 w-full p-3">
                                <p className="font-semibold font-montserrat">
                                    Product:
                                </p>
                                {latestOrder.products &&
                                latestOrder.products.length > 0 ? (
                                    <ul className="list-disc list-inside border-t mt-1">
                                        {latestOrder.products.map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center justify-between w-full mt-3 border-b border-gray-300 pb-3">
                                                    <div className="flex items-center  w-full">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className=" w-15 md:w-20 h-full object-cover rounded mr-4"
                                                        />
                                                        <div className="flex flex-col justify-around">
                                                            <p className="text-md lg:text-xl w-60 lg:w-80 font-semibold">
                                                                {item.name}{" "}
                                                            </p>
                                                            <div className="flex  gap-8 lg:justify-between text-xs md:text-sm lg:text-lg text-gray-600">
                                                                <p className="font-ysabeau  font-bold ">
                                                                    Size:
                                                                    <span className="">
                                                                        {
                                                                            item.size
                                                                        }
                                                                    </span>{" "}
                                                                </p>
                                                                <p className="text-yellow-500 md:hidden flex  font-semibold">
                                                                    $
                                                                    {
                                                                        item.pricePerUnit
                                                                    }
                                                                    .00
                                                                </p>
                                                                <p className="font-ysabeau hidden md:flex  font-bold   ">
                                                                    Qty:{" "}
                                                                    <span className="">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hidden w-20">
                                                        <p className="text-gray-600 xt-sm">
                                                            {item.size} x{" "}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-end w-full">
                                                        <p className="text-yellow-500 hidden md:flex text-xl font-semibold">
                                                            ${item.pricePerUnit}
                                                            .00
                                                        </p>
                                                        <p className="font-ysabeau md:hidden text-gray-600 font-bold text-lg">
                                                            {item.quantity}x
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
                            <div className="w-full flex flex-col gap-3 text-sm lg:text-lg font-ysabeau p-3">
                                <div className="flex justify-between">
                                    <strong>Order Id:</strong>
                                    <p>{latestOrder._id}</p>
                                </div>
                                <div className="flex justify-between">
                                    <strong>Status:</strong>{" "}
                                    {latestOrder.status}
                                </div>
                                <div className="flex justify-between">
                                    <strong>Total Price:</strong> $
                                    {latestOrder.totalPrice}
                                </div>
                                <div className="flex justify-between">
                                    <strong>Address:</strong>{" "}
                                    {latestOrder.shippingAddress}
                                </div>
                                <div className="flex justify-between">
                                    <strong>Payment Method:</strong>{" "}
                                    {latestOrder.paymentMethod}
                                </div>
                                <div className="flex justify-between">
                                    <strong>Payment Expired:</strong> {timeLeft}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-100 w-full md:w-1/2 lg:w-2/5 h-auto flex flex-col justify-around p-2 lg:p-4 rounded-xl">
                        <p className="text-xl w-full font-semibold mb-2">
                            🧾 Payment Details:
                        </p>
                        <div className="mt-5 p-4">
                            <p className="text-sm lg:text-lg font-montserrat">
                                Transfer Method
                            </p>

                            <div className="flex gap-2 lg:gap-5 mt-3">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            setSelectedTransfer("Visa")
                                        }
                                        className={`rounded-full text-sm p-1 md:p-2  w-5 h-5 border transition duration-300 ${selectedTransfer === "Visa" ? "bg-[#0C0C0C] text-white" : "border-gray-700 hover:bg-gray-600"}`}
                                    ></button>
                                    <img src={visa} className="w-20 h-20" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            setSelectedTransfer("Mastercard")
                                        }
                                        className={`rounded-full text-sm p-2  w-5 h-5 border transition duration-300 ${selectedTransfer === "Mastercard" ? "bg-[#0C0C0C] text-white" : "border-gray-700 hover:bg-gray-600"}`}
                                    ></button>
                                    <img
                                        src={mastercard}
                                        className="w-20 h-20"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col text-sm font-montserrat lg:text-lg justify-around space-y-5">
                            <div>
                                <label />
                                Card Name
                                <input
                                    name="cardName"
                                    value={paymentData.cardName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="jeff baston"
                                    className="w-full bg-white px-3 py-2 rounded"
                                />
                            </div>

                            <div>
                                <label />
                                Card Number
                                <input
                                    name="cardNumber"
                                    value={paymentData.cardNumber}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="01234567"
                                    className="w-full bg-white px-3 py-2 rounded"
                                />
                            </div>

                            <div>
                                <label />
                                CVV
                                <input
                                    name="cvv"
                                    value={paymentData.cvv}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="321"
                                    className="w-full bg-white px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex flex-col w-1/2">
                                    <label />
                                    Expired Month
                                    <input
                                        name="expiredMonth"
                                        value={paymentData.expiredMonth}
                                        onChange={handleChange}
                                        type="number"
                                        required
                                        placeholder="08"
                                        className="w-full bg-white px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label />
                                    Expired Year
                                    <input
                                        name="expiredYear"
                                        value={paymentData.expiredYear}
                                        onChange={handleChange}
                                        type="number"
                                        required
                                        placeholder="2030"
                                        className="w-full bg-white px-3 py-2 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="bg-[#0C0C0C] text-white w-full py-2 text-lg lg:text-xl xl:text-md px-4 rounded-lg  hover:bg-white hover:text-black transition duration-200"
                        >
                            Paid Now
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading transaction details...</p>
            )}
            <div className="flex justify-end md:items-center w-full">
                <button
                    onClick={() => navigate("/")}
                    className="text-sm lg:text-lg font-semibold h-12 lg:h-10 w-1/2 md:w-1/5 border border-gray-300 rounded-xl hover:bg-black hover:text-white"
                >
                    Back to Home
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-sm lg:text-xl text-center font-bold mb-4">
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

export default PaymentPages;
