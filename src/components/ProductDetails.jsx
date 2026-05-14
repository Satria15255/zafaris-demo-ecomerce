import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { getProductById, getAllProducts, } from "../api/Api";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard"
import CallAction from "../pages/CallAction"

function ProductModal() {
    const [product, setProduct] = useState([])
    const [recommended, setRecommended] = useState([])
    const [selectedSize, setSelectedSize] = useState("");
    const { handleAddToCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate();
    const { id } = useParams()


    const fetchProduct = async () => {
        try {
            const res = await getProductById(id)
            setProduct(res.data)
            console.log(res.data)

            const { data: products } = await getAllProducts();
            const shuffled = products.sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 4));
        } catch (error) {
            console.log(error)
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



    return (
        <div className="mt-16 pt-10 bg-white p-6 rounded-lg w-full h-full md:h-auto flex-col items-center overflow-y-auto">
            <div className="flex justify-center px-6">
                <div className="w-full h-full flex justify-center p-3">
                    <img src={product.image} alt={product.name} className=" w-4/5 h-full object-cover flex justify-center items-center rounded-md mt-2" />
                </div>

                <div className="w-full flex justify-around flex-col">
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <p className="text-lg text-gray-500">{product.brand} / {product.category}</p>
                            <p className="text-5xl font-semibold">{product.name}</p>
                            <div className="flex items-center text-lg">
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <p className="text-lg text-gray-400 pl-4">  4.9 (120 Reviews)</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center ">
                        {isDiscount ? (
                            <div className="flex gap-2">
                                <p className="text-sm lg:text-3xl font-bold line-through">USD {product.price}.00</p>
                                <p className="text-sm lg:text-3xl  font-bold">USD {product.discountPrice}.00</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm lg:text-3xl font-bold">USD {product.price}.00</p>
                            </>
                        )}
                    </div>

                    <div className="">
                        <p className="text-2xl font-semibold">Size Charts</p>
                        <div className="mt-6">

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


                {/* <div className="mt-auto flex flex-col justify-arround xl:hidden items-end ">
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
                </div> */}
            </div>

            <div className="mt-9 px-6">
                <p className="text-2xl font-semibold">Product Description</p>
                <p className="py-3 text-sm lg:text-lg border-bottom w-full ">{product.description}</p>
            </div>

            <div className="mt-8 px-6 w-full">
                <p className="text-2xl font-semibold pb-4">Recommended for You :</p>
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
