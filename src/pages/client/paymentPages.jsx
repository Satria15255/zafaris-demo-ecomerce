import { useEffect, useState } from "react";
import ProductCard from "@/components/client/ProductCard";
import { getTransactionById, getAllProducts, payTransaction } from "@/api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/client/Loader";

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
        <div className="mt-16 p-2 md:p-4 ">
            <p className="text-xl lg:text-4xl md:pt-10 font-bold pb-6 text-green-600">
                💳 Complete Your Payment
            </p>

            {latestOrder ? (
                <div className="mb-8 p-4 border border-gray-300 flex flex-col md:flex-row rounded-lg shadow">
                    {/* Order Details */}
                    <div className="flex flex-col w-full md:w-4/5">
                        <p className="text-xl w-full font-semibold mb-2">
                            🧾 Order Details:
                        </p>
                        <div className="h-full flex flex-col justify-between">
                            <div className="mt-3 w-full p-3">
                                <p className="font-semibold">Product:</p>
                                {latestOrder.products &&
                                latestOrder.products.length > 0 ? (
                                    <ul className="list-disc list-inside border-t mt-1">
                                        {latestOrder.products.map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center justify-around mt-3 border-b border-gray-300 pb-3">
                                                    <div className="flex items-center w-full">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-full object-cover rounded mr-4"
                                                        />
                                                        <p className="text-md md:text-lg lg:text-lg w-30 md:w-40 font-semibold">
                                                            {item.name}{" "}
                                                        </p>
                                                    </div>
                                                    <div className="md:hidden w-20">
                                                        <p className="text-gray-500 text-md md:text-sm">
                                                            {item.size} x{" "}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="hidden md:flex justify-around gap-4 w-full">
                                                        <p>
                                                            Size:
                                                            <span className="font-bold">
                                                                {item.size}
                                                            </span>{" "}
                                                        </p>
                                                        <p>
                                                            Quantity:{" "}
                                                            <span className="font-bold">
                                                                {item.quantity}
                                                            </span>
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
                            <div className="w-full flex flex-col gap-3 border-t border-gray-300 p-3">
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
                    <div className="bg-black w-full md:w-2/5 h-150 flex flex-col justify-around p-4 text-white rounded-xl">
                        <p className="text-xl w-full font-semibold mb-2">
                            🧾 Payment Details:
                        </p>
                        <div className="mt-5 p-4">
                            <p className="text-lg ">Transfer Method</p>
                            <div className="flex justify-center gap-2 lg:gap-5 mt-3">
                                <button
                                    onClick={() => setSelectedTransfer("Visa")}
                                    className={`rounded-full text-sm px-2 h-12 w-1/2 border transition duration-300 ${selectedTransfer === "Visa" ? "bg-white text-black" : "border-gray-700 hover:bg-gray-600"}`}
                                >
                                    Visa
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedTransfer("Mastercard")
                                    }
                                    className={`rounded-full text-sm px-2 h-12 w-1/2 border transition duration-300 ${selectedTransfer === "Mastercard" ? "bg-white text-black" : "border-gray-700 hover:bg-gray-600"}`}
                                >
                                    Mastercard
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col text-sm lg:text-lg justify-around space-y-5">
                            <div>
                                <input
                                    name="cardName"
                                    value={paymentData.cardName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="Your Card Name"
                                    className="w-full border-b bg-black   px-3 py-2 rounded"
                                />
                            </div>

                            <div>
                                <input
                                    name="cardNumber"
                                    value={paymentData.cardNumber}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="Card Number"
                                    className="w-full h-12   border-b px-3 rounded"
                                />
                            </div>

                            <div>
                                <input
                                    name="cvv"
                                    value={paymentData.cvv}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="CVV"
                                    className="w-full border-b  px-3 py-2 rounded"
                                />
                            </div>

                            <div className="flex gap-3">
                                <input
                                    name="expiredMonth"
                                    value={paymentData.expiredMonth}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    placeholder="Expired Month"
                                    className="w-1/2  border-b px-3 py-2 rounded"
                                />
                                <input
                                    name="expiredYear"
                                    value={paymentData.expiredYear}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                    placeholder="Expired Year"
                                    className="w-1/2  border-b px-3 py-2 rounded"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="bg-white text-black w-full py-2 text-lg lg:text-xl px-4 rounded-lg  hover:bg-gray-100"
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
