import { useEffect, useState } from "react";
import { getBestSellingProducts } from "../api/Api";

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

    return (
        <div className="my-12">
            <header className="flex flex-col items-center py-4">
                <p className="text-center text-lg md:text-sm lg:text-3xl px-4 font-semibold text-underline">
                    Best <span className="text-yellow-500">Deals </span>
                </p>
            </header>
            <main className=" w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 grid grid-cols-1 md:grid-cols-3 place-items-center ">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col justify-center items-center w-90 md:rounded-5 lg:rounded-lg mt-2 ">
                        <div>
                            <img src={product.image} className="w-30 h-30 md:w-50 lg:w-full md:h-auto rounded-2 md:rounded-4 lg:rounded-sm object-cover " />
                        </div>
                        <div className="mt-2 p-2 flex flex-col space-y-5 justify-center items-center lg:justify-center">
                            <p className="text-center text-sm md:text-[15px] lg:text-xl"> {product.name}</p>
                            <p className="text-center py-2 text-yellow-500 text-sm lg:text-lg font-bold">${product.price}.00</p>
                            {/* <p className="text-xs md:text-sm lg:text-xl font-bold font-sans md:py-2 hover:text-color-red hover:underline transition duration-300">
                                -BUY NOW
                            </p> */}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Bestseller;
