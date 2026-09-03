import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Slide1 from "@/assets/heroSection/heroBackground.webp";
import Slide2 from "@/assets/heroSection/testt.png";
import "swiper/css";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="   pt-15  md:pt-12 lg:pt-17 md:mt-17 flex justify-center w-full xl:max-w-7xl h-full xl:h-auto">
            <div className="relative flex justify-end items-center w-100 md:w-full h-50 md:h-100 xl:h-120  ">
                <img
                    src={Slide1}
                    className="w-full h-full   lg:h-screen xl:h-full object-cover object-center rounded-lg "
                />
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
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:w-1/2 md:px-5  md:h-10  text-[6px] md:text-[8px] lg:text-xs text-white hover:border border-white hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-transparent hidden md:flex items-center justify-center w-1/3 md:w-1/2 md:px-5  md:h-10 text-[6px] md:text-[7px] lg:text-xs  border border-white text-white hover:border-none hover:bg-black hover:text-white transition duration-300"
                        >
                            EXPLORE COLLECTION
                        </button>
                    </div>
                </header>
            </div>
        </section>
    );
};

export default Hero;
