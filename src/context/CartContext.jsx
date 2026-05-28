import { createContext, useContext, useState, useEffect } from "react"
import { addToCart, removeCartItem, getCart, updateCartQuantity, clearCart } from "../api/Api"
import { toast } from "react-toastify"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const { user } = useAuth()

    // Fetch Cart Items
    const fetchCart = async () => {
        try {
            const res = await getCart()
            setCart(res.data.items || [])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    // Handle Add Cart Items
    const handleAddToCart = async (product, size) => {
        if (!user) {
            return toast.warning("Please login to add products to cart")
        }

        try {
            const res = await addToCart(product._id, 1, size)
            await fetchCart()
            toast.success("Product added to cart")
        } catch (err) {
            console.log(err)
            toast.error("Failed to add product to cart")
        }
    }

    // Update Product Quantity
    const updateQty = async (productId, size, quantity) => {
        try {
            await updateCartQuantity(productId, size, quantity)
            await fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    // Remove Cart Item
    const removeCartItems = async (productId, size) => {
        try {
            const res = await removeCartItem(productId, size)
            await fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    // Clear Cart Items
    const handleClearCart = async () => {
        try {
            await clearCart()
            setCart([])
        } catch (err) {
            console.log(err)
        }
    }


    // Total Price
    const totalPrice = (cart || []).reduce(
        (acc, item) => acc + item.finalPrice * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,
                handleAddToCart,
                updateQty,
                removeCartItems,
                handleClearCart,
                totalPrice
            }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
