import React, { useEffect, useState } from "react";
import { getBestSellingProducts } from "../api/Api";

const Bestseller = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await getBestSellingProducts();
            console.log(res.data);
            setProducts(res.data.slice(0, 2));
        } catch (err) {
            console.log("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="mt-12">
            <header className="flex flex-col items-center py-4">
                <p className="text-center text-lg md:text-sm lg:text-3xl px-4 font-bold text-underline">
                    Best <span className="text-yellow-500">Selling </span>
                </p>
            </header>
            <main className=" w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 grid grid-cols-1 md:grid-cols-2 ">
                {products.map((product) => (
                    <div key={product.id} className="grid grid-cols-2 bg-gray-100 hover:shadow-lg md:rounded-5 lg:rounded-lg transition duration-300 mt-2 ">
                        <div className="mt-2 p-2 flex flex-col justify-center lg:justify-center">
                            <p className="py-2 text-yellow-500 text-sm lg:text-xl font-bold">${product.price}</p>
                            <p className="font-bold text-sm md:text-[15px] lg:text-3xl"> {product.name}</p>
                            {/* <p className="hidden lg:flex text-[6px] md:text-[7px] lg:text-[10px]">{product.description}</p> */}
                            <p className="text-xs md:text-sm lg:text-xl font-bold font-sans md:py-2 hover:text-color-red hover:underline transition duration-300">
                                -BUY NOW
                            </p>
                        </div>
                        <div>
                            <img src={product.image} className="w-30 h-30 md:w-50 lg:w-full md:h-auto rounded-2 md:rounded-4 lg:rounded-xl object-cover " />
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Bestseller;
