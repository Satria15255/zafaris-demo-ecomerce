import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { getProductById, getAllProducts, } from "../api/Api";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader"
import ProductCard from "./ProductCard"
import CallAction from "../pages/CallAction"

function ProductModal() {
    const [product, setProduct] = useState([])
    const [recommended, setRecommended] = useState([])
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true)
    const { handleAddToCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate();
    const { id } = useParams()


    const fetchProduct = async () => {
        try {
            setLoading(true)
            const res = await getProductById(id)
            setProduct(res.data)
            console.log(res.data)

            const { data: products } = await getAllProducts();
            const shuffled = products.sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 4));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    const { discountPercent, discountPrice } = product;
    const isDiscount = discountPercent && discountPrice;
    // Fungsi Checkout product
    const handleChekoutNow = () => {
        try {

            if (!user) {
            navigate("/login");
            return;
        }
        if (!selectedSize) {
            toast.warning("Please select a size before adding to cart.");
            return;
            }
        } catch (error) {
            console.log(error)
        }

        const finalPrice = product.discountPercent > 0 ? product.price - (product.price * product.discountPercent) / 100 : product.price;

        const selectedItem = {
            id: product._id,
            name: product.name,
            image: product.image,
            size: selectedSize,
            quantity: 1,
            finalPrice,
            discountPercent: product.discountPercent,
        };

        navigate("/checkout", { state: { checkoutItems: [selectedItem] } });
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="md:mt-16 pt-12 bg-white  rounded-lg w-full h-full md:h-auto flex-col items-center overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-center px-4">
                <div className="w-full h-full flex justify-center">
                    <img src={product.image} alt={product.name} className="w-full lg:w-4/5 h-full object-cover flex justify-center items-center rounded-md mt-2" />
                </div>
                <div className="w-full gap-3 flex justify-around flex-col md:pl-6 mt-3">
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <p className="text-sm md:text-lg text-gray-500">{product.brand} / {product.category}</p>
                            <p className="text-3xl lg:text-5xl font-semibold">{product.name}</p>
                            <div className="flex items-center text-sm lg:text-lg">
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <p className="text-sm lg:text-lg text-gray-400 pl-4">  4.9 (120 Reviews)</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center ">
                        {isDiscount ? (
                            <div className="flex gap-2">
                                <p className="text-lg lg:text-3xl font-bold line-through">USD {product.price}.00</p>
                                <p className="text-lg lg:text-3xl  font-bold">USD {product.discountPrice}.00</p>
                            </div>
                        ) : (
                                <div className="">
                                    <p className="text-lg lg:text-3xl font-bold">USD {product.price}.00</p>
                                </div>
                        )}
                    </div>

                    <div className="">
                        <p className="text-lg lg:text-2xl font-semibold">Size Charts</p>
                        <div className="mt-3 lg:mt-6">
                            <div className="flex flex-wrap gap-3">
                                {product?.sizes?.length > 0 ? (
                                    product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border rounded-md transition 
                    ${selectedSize === size
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white hover:bg-gray-100"}`}
                                        >
                                            {size}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-sm">Size not available</p>
                                )}
                            </div>

                            {!selectedSize && (
                                <p className="text-red-500 text-sm mt-2">Please select a size</p>
                            )}
                        </div>
                    </div>



                    <div className=" flex gap-4 justify-arround ">
                        <button onClick={() => handleAddToCart(product, selectedSize, discountPrice)} className="mt-2 flex gap-2 items-center justify-center w-full px-2 py-3 border bg-black text-white hover:text-black rounded-md hover:bg-white transition">
                            Add to Cart <FaCartPlus />
                        </button>
                        <button
                            onClick={() => {
                                handleChekoutNow();
                                // closed();
                            }}
                            className="mt-2 w-full px-2 py-3 bg-white border  hover:text-white rounded-md hover:bg-black transition"
                        >
                            Chekout
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-9 px-4">
                <p className="text-xl lg:text-2xl font-semibold">Product Description</p>
                <p className="py-3 text-sm lg:text-lg border-bottom w-full ">{product.description}</p>
            </div>

            <div className="mt-8 px-4 w-full">
                <p className="text-xl lg:text-2xl font-semibold pb-4">Might You Like:</p>
                <div className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-3">
                    {recommended.map((product) => (
                        <ProductCard key={product._id} productDetails={() => navigate(`/product/${product._id}`)} product={product} />
                    ))}
                </div>
            </div>

            <div>
                <CallAction />
            </div>
        </div>
    );
}

export default ProductModal;
