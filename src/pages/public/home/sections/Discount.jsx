import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import discountImage from "@/assets/discountImage(1).webp";
import { getDiscountProducts } from "@/features/products/services/productService";
import MobileBestSeller from "@/features/bestSeller/components/MobileBestSeller";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import ProductCard from "@/features/products/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { LazyMotion, domAnimation } from "framer-motion";

const OnSale = () => {
    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        try {
            const res = await getDiscountProducts();
            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const mainProduct = product[0];
    const otherProduct = product.slice(1, -1);
    console.log(mainProduct);
    console.log(otherProduct);

    const navigate = useNavigate();
    return (
        <main className=" mt-6 flex justify-center w-full h-auto">
            {/*<div className="w-100 md:w-full h-50 md:h-60 lg:h-80 flex  bg-[#0C0C0C] ">
                <picture className="w-2/5">
                    <source
                        media="(max-width: 640px)"
                        srcSet={discountImage}
                        className="w-full h-full  object-cover object-center"
                    />
                    <img
                        src="/homeSection/discountImage.webp"
                        alt="discountImage"
                        width="1024"
                        height="1278"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full  object-cover object-center"
                    />
                </picture>
                <header className="w-3/5 text-white flex p-4 flex-col justify-center gap-1 md:gap-3 font-montserrat">
                    <p className="text-[8px]  md:text-xs lg:text-sm">
                        LIMITED OFFER
                    </p>
                    <p className="text-lg md:text-4xl lg:text-5xl xl:text-6xl">
                        30% off every day for <br /> our dream products
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="py-1 lg:py-2 text-[7px] md:text-xs lg:text-lg px-4 rounded-lg text-black w-1/3 lg:w-1/5 bg-white border border-gray-300"
                    >
                        Get Now
                    </button>
                </header>
            </div>*/}
            <div className="flex w-full h-90 border border-gray-200 bg-[#FBEFDD]">
                <div className="w-4/6 flex">
                    <div className="bg-[#0C0C0C] w-1/2 p-4 h-full flex flex-col justify-around">
                        <div className=" flex flex-col justify-center ">
                            <p className="flex gap-4 text-[#D2A14A] items-center">
                                <div className="flex">
                                    <TfiLayoutLineSolid />
                                    <TfiLayoutLineSolid />
                                </div>
                                24H DISCOUNT
                            </p>
                            <h1 className="text-white text-6xl font-serif">
                                DAILY{" "}
                                <span className="text-[#D2A14A]">DROP</span>
                            </h1>
                            <p className="text-white text-xl font-serif">
                                Selected for today, Gone tomorrow
                            </p>
                        </div>
                        <div>
                            <p className=" font-light text-white">
                                NEXT DROP IN
                            </p>
                            <div className="flex gap-3 mt-2">
                                <div>
                                    <CountdownTimer
                                        expiresAt={mainProduct?.expiresAt}
                                        onExpire={() => {
                                            console.log("Discount expired");
                                        }}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-1/2 flex items-center">
                                    <button className="w-full flex items-center font-semibold justify-center gap-3 py-5 bg-[#D2A14A] rounded-lg text-white text-sm">
                                        SHOP THE DROP <FaArrowRightLong />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="flex gap-4 text-white items-center">
                                <div className="flex text-[#D2A14A]">
                                    <TfiLayoutLineSolid />
                                    <TfiLayoutLineSolid />
                                </div>
                                PREMIUM DISCOUNT EVERYDAY
                            </p>
                        </div>
                    </div>
                    <div
                        className="bg-white w-1/2 flex  justify-between h-auto bg-center bg-cover  p-6"
                        style={{
                            backgroundImage: `url(${mainProduct?.productId?.image})`,
                        }}
                    >
                        <div className="pt-7">
                            <p className="text-lg font-bold">
                                {mainProduct?.productId?.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {mainProduct?.productId?.brand} /{" "}
                                {mainProduct?.productId?.category}
                            </p>
                            <div className="flex gap-2 ">
                                <p className="line-through text-lg font-semibold">
                                    ${mainProduct?.productId?.price.toFixed(2)}
                                </p>
                                <p className="text-xl text-[#C9892C] font-bold">
                                    ${mainProduct?.discountPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="px-4 h-10 flex items-center rounded-lg bg-[#D2A14A] text-black">
                            <p className="text-lg">
                                -{mainProduct?.discountPercent}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-2/6 flex flex-col h-full p-6">
                    <div className="flex justify-start">
                        <p className="font-light font-semibold font-ysabeau">
                            MORE TODAY
                        </p>
                    </div>
                    <div className="flex h-4/5 justify-center h-full">
                        <LazyMotion features={domAnimation}>
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                slidesPerView={2}
                                slidesPerGroup={2}
                                autoplay={{ delay: 4000 }}
                                spaceBetween={8}
                                pagination={{
                                    el: ".swiper-pagination",
                                    clickable: true,
                                }}
                            >
                                {otherProduct.map((product) => (
                                    <SwiperSlide
                                        key={product._id}
                                        className="pb-6 p-2"
                                    >
                                        <ProductCard
                                            product={product.productId}
                                            productDetails={() =>
                                                navigate(
                                                    `/product/${product.productId._id}`,
                                                )
                                            }
                                        />
                                    </SwiperSlide>
                                ))}

                                <div className="swiper-pagination" />
                            </Swiper>
                        </LazyMotion>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OnSale;
