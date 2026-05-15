import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ShoppingCart = ({ closeShoppingCart }) => {
    const { cart, removeCartItems, updateQty, totalPrice } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate();

    console.log("Carty isinya ", cart)

    return (
        <div className="fixed bg-black/20 inset-0 w-full z-50 h-screen flex justify-end ">
            <div className="bg-white w-2/5 flex flex-col items-center">
                <div className="w-full">
                    {/* Tombol Close */}
                    <div className="flex justify-between p-5 border-b border-gray-400">

                        <button onClick={closeShoppingCart} className="top-4 left-4 text-2xl font-bold text-gray-600 hover:text-gray-900">
                            ×
                        </button>
                        <p className="text-md mt-3 lg:text-2xl font-semibold mb-4 md:mb-6">Your cart</p>
                    </div>
                    {/* Tabel Cart */}
                    <div className="w-full h-100">
                        <div className="w-full p-1  bg-white lg:p-6 overflow-x-hidden overflow-y-auto max-h-[60vh] md:max-h-[40vh] lg:max-h-[62vh]">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center">Your cart is empty</p>
                            ) : (
                                <table className="w-full border-collapse">
                                    <thead className="hidden md:table-header-group">
                                        <tr className="border-b">
                                            <th className="text-left text-xs pb-2">PRODUCT</th>
                                            <th className="text-center text-xs pb-2">QUANTITY</th>
                                            <th className="text-right text-xs pb-2">TOTAL</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cart.map((item) => {
                                            return (
                                                <tr key={`${item.productId._id} - ${item.size}`} className="border-b">
                                                    {/* Produk */}
                                                    <td className="flex items-center py-4">
                                                        <img src={item.productId.image} alt={item.productId.name} className="w-14 h-14 md:w-20 md:h-20 lg:w-20 lg:h-20 object-cover rounded mr-1 md:mr-4" />
                                                        <div>
                                                            <p className="text-[10px] md:text-lg text-sm max-w-sm font-medium">{item.productId.name}</p>
                                                            <p className="text-xs lg:text-sm text-gray-600 font-semibold">Size: {item.size}</p>
                                                            <div className="flex gap-2 items-center">
                                                                {item.discountPercent > 0 && (
                                                                    <div className="flex gap-2">
                                                                        <p className="text-sm">${item.discountPercent}OFF</p>
                                                                        <p className="text-sm line-through">${item.price}.00 </p>
                                                                    </div>
                                                                )}
                                                                <p className="text-yellow-500 text-sm text-lg font-semibold">${item.finalPrice}.00</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Quantity */}
                                                    <td className="flex-col items-center text-center md:table-cell">
                                                        <div className="flex items-center justify-center">
                                                            <button className="text-xs lg:text-sm px-2 py-1 border rounded" onClick={() => updateQty(item.productId._id, item.size, item.quantity - 1)}>
                                                                -
                                                            </button>
                                                            <span className="text-xs lg:text-sm px-2 md:px-4">{item.quantity}</span>
                                                            <button className="text-xs lg:text-sm px-2 py-1 border rounded" onClick={() => updateQty(item.productId._id, item.size, item.quantity + 1)}>
                                                                +
                                                            </button>
                                                        </div>
                                                        <button onClick={() => removeCartItems(item.productId._id, item.size)} className="text-xs md:text-sm text-gray-500 hover:text-red-500 md:mt-1">
                                                            Remove
                                                        </button>
                                                    </td>

                                                    {/* Total Harga per Item */}
                                                    <td>
                                                        <div className="flex items-center text-lg justify-center text-right text-yellow-500 font-semibold  hidden md:block">${item.finalPrice * item.quantity}.00</div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                    {/* Total Harga Keseluruhan & chekout */}
                    <div className="w-full border-t border-gray-400 p-4 mt-4 ">
                        <div className="grid grid-cols-2">
                            <p className="text-[16px] md:text-lg font-semibold text-left">Sub Total</p>
                            <div className="text-right">
                                {cart.length > 0 && (
                                    <h2 className="text-[16px] md:text-xl font-semibold text-right">
                                        <span className="text-yellow-500">${totalPrice.toFixed(2)}</span>
                                    </h2>
                                )}
                            </div>
                        </div>
                        <div>
                            {cart.length === 0 ? (
                                <button className="text-lg flex justify-center items-center mt-3 w-full h-12  bg-gray-200 text-white "
                                >
                                    Chek Out Now
                                </button>
                            ) : (
                                    <button
                            onClick={() => {
                                navigate("/checkout", {
                                    state: {
                                        checkoutItems: cart.map((item) => ({
                                            id: item.productId._id,
                                            name: item.productId.name,
                                            image: item.productId.image,
                                            size: item.size,
                                            quantity: item.quantity,
                                            finalPrice: item.finalPrice,
                                            discountPercent: item.discountPercent,
                                        })),
                                    },
                                });

                                closeShoppingCart()
                            }}
                                        className="text-lg flex justify-center items-center mt-3 w-full h-12 border bg-black text-white border-black  hover:text-black hover:bg-white transition duration-300 "
                        >
                            Chek Out Now
                        </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
