import { useEffect, useState } from "react";
import { getBestSellingProducts } from "../api/Api";
import { FaCartPlus, FaStar } from "react-icons/fa";

const Bestseller = () => {
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const res = await getBestSellingProducts();
            console.log(res.data);
            setProducts(res.data);
        } catch (err) {
            console.log("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const { discountPercent, discountPrice } = products;

    const isDiscount = discountPercent && discountPrice;
    return (
        <div className="my-12">
            <header className="flex flex-col items-center py-4">
                <p className="text-center text-lg md:text-sm lg:text-3xl px-4 font-semibold text-underline">
                    Best <span className="text-yellow-500">Deals </span>
                </p>
            </header>
            <main className=" w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 grid grid-cols-1 md:grid-cols-3 place-items-center ">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col justify-center w-90 md:rounded-5 lg:rounded-lg mt-2 ">
                        <div>
                            <img src={product.image} className="w-30 h-30 md:w-50 lg:w-full md:h-auto rounded-2 md:rounded-4 lg:rounded-sm object-cover " />
                        </div>
                        <div className="mt-2 p-2 flex flex-col space-y-3 lg:justify-center">
                            <div>
                                <p className="text-sm md:text-[15px] lg:text-xl"> {product.name}</p>
                            </div>
                            <div className="flex">
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <FaStar className="text-yellow-500" />
                                <p className="text-xs text-gray-400">  4.9 (120 Reviews)</p>
                            </div>
                            <div className="flex justify-between items-center ">
                                <div className="flex h-[40px] items-center">
                                    {isDiscount ? (
                                        <div className="flex gap-1">
                                            <p className=" text-sm lg:text-lg line-through">${product.price.toFixed(2)}</p>
                                            <p className="text-sm lg:text-lg text-yellow-500 font-bold">${discountPrice.toFixed(2)}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm lg:text-lg text-yellow-500 font-bold">${product.price.toFixed(2)}</p>
                                        </>
                                    )}
                                </div>
                                <p className="text-xs md:text-sm cursor-pointer lg:text-md h-10 px-5 font-sans bg-black rounded-full text-white flex items-center gap-3 hover:text-black hover:bg-white border border-gray-500 transition duration-300">
                                    <span className="text">Add to Cart</span><FaCartPlus />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Bestseller;
