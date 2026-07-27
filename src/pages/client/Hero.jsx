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
        <div className=" px-2 lg:p-4 pt-15 md:pt-15 lg:pt-17 md:mt-16 flex justify-center w-full h-auto">
            <div className="relative flex justify-end items-center w-full xl:h-120">
                <img
                    src={Slide1}
                    className="w-full h- md:h-100 lg:h-screen xl:h-full object-cover object-center rounded-lg "
                />
                <div className="absolute inset-0 flex flex-col md:gap-4 items-start p-4 xl:p-5 w-2/3  justify-center ">
                    <p className="text-[6px] md:text-sm font-montserrat text-white">
                        NEW ARRIVAL
                    </p>
                    <p className="text-xl md:text-4xl lg:text-7xl xl:text-7xl font-montserrat text-white ">
                        New Collection <br /> Just Landed
                    </p>
                    <p className="text-[6px] leading-tight py-1 md:text-sm lg:text-lg text-white font-ysabeau">
                        Discover the latest products from top brands. <br />
                        Designed for performance, built for style.
                    </p>
                    <div className="flex gap-1 md:gap-3 w-full">
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-black w-1/3 md:px-5  md:h-10  text-[6px] md:text-xs text-white hover:border border-white hover:bg-transparent transition duration-300"
                        >
                            SHOP NOW
                        </button>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-transparent  w-1/3 md:px-5  md:h-10  text-[6px] md:text-xs  border border-white text-white hover:border-none hover:bg-black hover:text-white transition duration-300"
                        >
                            EXPLORE COLLECTION
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
