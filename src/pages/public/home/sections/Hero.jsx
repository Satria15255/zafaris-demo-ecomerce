import heroMobile from "@/assets/heroSection/heroBackground(1).webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect } from "react";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
    const slides = [
        {
            src: "/homeSection/heroImage.webp",
            label: "Uncompromising Style",
            title: "A Curated Collection of Footwear for Those Who Care About Quality and Detail.",
            text: "Each pair is crafted from select materials with a timeless design. Step out with confidence, wherever you go, in shoes built to last.",
        },
        {
            src: "/homeSection/heroImage2.webp",
            label: "Now Running",
            title: "The newcomer—a running collection for those who expect more from every step.",
            text: "Introducing the Running Collection, where performance meets craftsmanship. Select materials, a secure fit, and a clean design that goes the distance.",
        },
    ];

    // Preload + decode semua gambar hero di awal
    useEffect(() => {
        slides.forEach(({ src }) => {
            const img = new Image();
            img.src = src;
            img.decode?.().catch(() => {});
        });
    }, []);

    return (
        <main className=" bg-white pt-16 md:mt-12 w-full h-auto lg:h-screen ">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="hero-swiper h-150 lg:h-full w-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={slide.src} className="relative">
                        <img
                            src={slide.src}
                            alt={slide.label}
                            loading="eager"
                            fetchPriority={i === 0 ? "high" : "auto"}
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 px-6 text-white bg-black/70">
                            <span className="text-xs lg:text-sm">
                                {slide.label}
                            </span>
                            <h1 className="max-w-3xl text-xl lg:text-2xl md:text-4xl text-center">
                                {slide.title}
                            </h1>
                            <p className="max-w-lg text-xs lg:text-sm text-center">
                                {slide.text}
                            </p>
                            <button className="py-3 px-12 text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition duration-300">
                                Shop Now
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </main>
    );
};

export default Hero;

{
    /*<div className="grid grid-cols-1 md:grid-cols-2 text-black gap-4">
                <div className="flex flex-col items-start p-5 justify-center space-y-2 md:space-y-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 items-center">
                            <div className="bg-gray-400 p-1 rounded-full"></div>
                            <p className="text-md md:text-sm font-montserrat t ">
                                NEW ARRIVAL
                            </p>
                        </div>
                        <h1 className="text-5xl md:text-5xl lg:text-7xl xl:text-7xl font-montserrat  ">
                            Find Your <br /> Perfect Shoes
                        </h1>
                    </div>
                    <p className="text-sm leading-tight py-2 max-w-sm md:text-sm lg:text-sm  font-light">
                        Crafted for performance, engineered for silence.
                        Discover sculptural footwear and contemporary
                        silhouettes curated from global avant-garde ateliers.
                    </p>
                    <div className="flex gap-1 md:gap-3 w-full ">
                        <button
                            aria-label="Shop Now"
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:w-1/3 md:px-5 cursor-pointer  h-10  text-xs lg:text-sm font-semibold text-white hover:border border-[#0C0C0C] hover:text-[#0C0C0C] hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            aria-label="Explore Products"
                            onClick={() => navigate("/products")}
                            className="bg-transparent  flex  cursor-pointer items-center justify-center gap-3  md:px-5  h-10 text-xs lg:text-sm  border-transparent hover:underline  transition duration-300"
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

                <div className="flex justify-center items-center">
                    <div className="w-full p-5 relative">
                        <img
                            src={newProduct?.image}
                            alt={newProduct?.name}
                            width="500"
                            height="500"
                            loading="lazy"
                            decoding="async"
                            className="w-full bg-[#FBFAF7] p-4"
                        />
                        <div className="bg-[#0C0C0C] text-sm lg:text-md xl:text-lg text-white top-0 right-0 mb-7 p-2 absolute flex justify-center items-center w-40 xl:w-50">
                            <div>
                                <p>NEW PRODUCT</p>
                            </div>
                        </div>
                        <div className="bg-white bottom-0 left-0 mt-6 p-2 absolute flex justify-between items-center w-70 lg:w-100 border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-400 p-1 rounded-full"></div>
                                <div className="font-ysabeau">
                                    <p
                                        onClick={() =>
                                            navigate(
                                                `/product/${newProduct._id}`,
                                            )
                                        }
                                        className="text-sm xl:text-lg font-semibold cursor-pointer"
                                    >
                                        {newProduct?.name}
                                    </p>
                                    <p className="text-xs font-light text-gray-600">
                                        {newProduct?.brand} /{" "}
                                        {newProduct?.category}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold text-sm xl:text-lg">
                                ${newProduct?.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>*/
}
