import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/features/products/services/productService";
import heroMobile from "@/assets/heroSection/heroBackground(1).webp";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await getLatestProducts();
            console.log(res.data);
            setProducts(res.data);
            console.log(products);
        } catch (err) {
            console.err("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const newProduct = products[0];

    console.log(newProduct);

    return (
        <section className="pt-15 px-2 md:px-4 md:pt-12 xl:pt-15 bg-white md:mt-17 w-full  h-full xl:h-150">
            {/*<div className="relative flex justify-end items-center w-100 md:w-full h-50 md:h-100 xl:h-120 overflow-hidden rounded-lg  ">
                <picture className="absolute w-full h-full object-cover object-center">
                    <source media="(max-width: 640px)" srcSet={heroMobile} />
                    <img
                        src="/homeSection/heroBackground.webp"
                        alt="Zafaris new collection - new arrival shoes"
                        width={1600}
                        height={640}
                        loading="eager"
                        fetchPriority="high"
                        className="absolute w-full h-full object-cover object-center"
                    />
                </picture>
                <header className="absolute inset-0 flex flex-col md:gap-4 lg:items-start p-4 xl:p-5 w-full lg:w-2/3  justify-center ">
                    <p className="text-[6px] md:text-sm font-montserrat text-white">
                        NEW ARRIVAL
                    </p>
                    <p className="text-2xl md:text-5xl lg:text-7xl xl:text-7xl font-montserrat text-white ">
                        New Collection <br /> Just Landed
                    </p>
                    <p className="text-[6px] leading-tight py-2 md:text-sm lg:text-lg text-white font-ysabeau">
                        Discover the latest products from top brands. <br />
                        Designed for performance, built for style.
                    </p>
                    <div className="flex gap-1 md:gap-3 w-1/2 ">
                        <button
                            aria-label="Shop Now"
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:w-1/2 md:px-5  md:h-10  text-[6px] md:text-[8px] lg:text-xs text-white hover:border border-white hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            aria-label="Explore Products"
                            onClick={() => navigate("/products")}
                            className="bg-transparent hidden md:flex items-center justify-center w-1/3 md:w-1/2 md:px-5  md:h-10 text-[6px] md:text-[7px] lg:text-xs  border border-white text-white hover:border-none hover:bg-black hover:text-white transition duration-300"
                        >
                            EXPLORE COLLECTION
                        </button>
                    </div>
                </header>
            </div>*/}
            <div className="grid grid-cols-2 text-black">
                <div className="flex flex-col items-start p-5 justify-center space-y-4">
                    <div>
                        <div className="flex gap-4 items-center">
                            <div className="bg-gray-400 p-1 rounded-full"></div>

                            <p className="text-[6px] md:text-sm font-montserrat t ">
                                NEW ARRIVAL
                            </p>
                        </div>
                        <h1 className="text-2xl md:text-5xl lg:text-7xl xl:text-7xl font-montserrat  ">
                            Find Your <br /> Perfect Shoes
                        </h1>
                    </div>
                    <p className="text-[6px] leading-tight py-2 max-w-sm md:text-sm lg:text-sm  font-light">
                        Crafted for performance, engineered for silence.
                        Discover sculptural footwear and contemporary
                        silhouettes curated from global avant-garde ateliers.
                    </p>
                    <div className="flex gap-1 md:gap-3 w-full ">
                        <button
                            aria-label="Shop Now"
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:px-5 cursor-pointer md:h-10  text-[6px] md:text-[8px] lg:text-sm font-semibold text-white hover:border border-[#0C0C0C] hover:text-[#0C0C0C] hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            aria-label="Explore Products"
                            onClick={() => navigate("/products")}
                            className="bg-transparent  flex  cursor-pointer items-center justify-center gap-3  md:px-5  md:h-10 text-[6px] md:text-[7px] lg:text-sm  border-transparent hover:underline  transition duration-300"
                        >
                            EXPLORE COLLECTION <FaArrowRightLong />
                        </button>
                    </div>
                    <div className="flex justify-between w-full border-t border-gray-300 py-6 mt-6">
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">100%</span> VERIFIED
                                AUTHENTIC
                            </p>
                        </div>
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">100%</span> BEST
                                QUALITY
                            </p>
                        </div>
                        <div>
                            <p className="text-xs">
                                <span className="font-bold">7-DAY</span> STUDIO
                                RETURN
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full relative">
                        <img
                            src={newProduct?.image}
                            alt="product.name"
                            className="w-4/5 m-6"
                        />
                        <div className="bg-[#0C0C0C] text-sm text-white top-1 right-0 mb-6 mr-16 p-2 absolute flex justify-center items-center w-40">
                            <div>
                                <p>NEW PRODUCT</p>
                            </div>
                        </div>
                        <div className="bg-white bottom-1 mt-6 p-2 absolute flex justify-between items-center w-100 border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-400 p-1 rounded-full"></div>
                                <div className="font-ysabeau">
                                    <p
                                        onClick={() =>
                                            navigate(
                                                `/product/${newProduct._id}`,
                                            )
                                        }
                                        className="text-sm  font-semibold cursor-pointer"
                                    >
                                        {newProduct?.name}
                                    </p>
                                    <p className="text-xs font-light text-gray-600">
                                        {newProduct?.brand} /{" "}
                                        {newProduct?.category}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">
                                ${newProduct?.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
