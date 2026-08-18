import { createContext, useContext, useState, useEffect } from "react";
import {
    addToCart,
    removeCartItem,
    getCart,
    updateCartQuantity,
    clearCart,
    getDiscountVoucher,
} from "../api/Api";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();
    const [voucher, setVoucher] = useState(null);
    const [voucherLoading, setVoucherLoading] = useState(false);
    const [voucherError, setVoucherError] = useState("");

    // Reset Voucher Helper
    const resetVoucher = () => {
        setVoucher(null);
        setVoucherError("");
    };

    // Fetch Cart Items
    const fetchCart = async () => {
        try {
            const res = await getCart();
            setCart(res.data.items || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Handle Add Cart Items
    const handleAddToCart = async (product, size) => {
        if (!user) {
            return toast.warning("Please login to add products to cart");
        }
        if (!size) {
            return toast.error("Please Select a size");
        }
        try {
            const res = await addToCart(product._id, 1, size);
            await fetchCart();
            toast.success("Product added to cart");
        } catch (err) {
            console.log(err);
            toast.error("Failed to add product to cart");
        }
    };

    // Update Product Quantity
    const updateQty = async (productId, size, quantity) => {
        try {
            await updateCartQuantity(productId, size, quantity);
            await fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    // Remove Cart Item
    const removeCartItems = async (productId, size) => {
        try {
            const res = await removeCartItem(productId, size);
            await fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    // Clear Cart Items
    const handleClearCart = async () => {
        try {
            await clearCart();
            setCart([]);
        } catch (err) {
            console.log(err);
        }
    };

    // Voucher discount apply
    const applyVoucher = async (code) => {
        if (!code?.trim()) {
            setVoucherError("Please enter a voucher code");
            return false;
        }

        try {
            setVoucherLoading(true);
            setVoucherError("");

            const res = await getDiscountVoucher({
                code: code.trim(),
            });

            setVoucher(res.data.data);

            return true;
        } catch (err) {
            console.log(err);

            setVoucher(null);

            const message =
                err.response?.data?.message || "Failed to apply voucher";

            setVoucherError(message);

            return false;
        } finally {
            setVoucherLoading(false);
        }
    };

    // remove voucher
    const removeVoucher = () => {
        setVoucher(null);
        setVoucherError("");
    };

    // Total Price
    const totalPrice = (cart || []).reduce(
        (acc, item) => acc + item.finalPrice * item.quantity,
        0,
    );
    const discountAmount = voucher?.discountAmount || 0;

    const finalTotal = voucher?.finalTotal ?? totalPrice;

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,

                handleAddToCart,
                updateQty,
                removeCartItems,
                handleClearCart,

                totalPrice,

                voucher,
                applyVoucher,
                removeVoucher,
                voucherLoading,
                voucherError,

                finalTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
