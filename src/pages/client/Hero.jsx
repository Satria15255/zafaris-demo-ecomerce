import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Slide1 from "@/assets/heroSection/testt.png";
import Slide2 from "@/assets/heroSection/testt.png";
import "swiper/css";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="  lg:p-4 pt-14 lg:pt-16 md:mt-16 flex justify-center h-auto">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000 }}
                loop
                className="h-full  max-w-6xl"
            >
                <SwiperSlide>
                    <div className="relative flex justify-end items-center">
                        <img
                            src={Slide1}
                            className="w-full h-auto md:h-100 lg:h-screen xl:h-140 object-cover object-center scale-120 rounded-lg "
                        />
                        <div className="absolute inset-0 flex flex-col gap-3 md:gap-4 p-8 items-cener w-2/3  justify-center ">
                            <p className="text-sm font-montserrat text-white">
                                NEW ARRIVAL
                            </p>
                            <p className="text-3xl md:text-4xl lg:text-7xl xl:text-7xl font-montserrat text-white ">
                                New Collection <br /> Just Landed
                            </p>
                            <p className="text-xs md:text-sm lg:text-lg max-w-md text-white font-ysabeau">
                                Discover the latest products from top brands.{" "}
                                <br /> Designed for performance, built for
                                style.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-black w-1/3 px-5  h-10   text-xs text-white hover:border border-white hover:bg-transparent transition duration-300"
                                >
                                    SHOP NOW
                                </button>
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-transparent  w-1/3  px-5  h-10   text-xs  border border-white text-white hover:border-none hover:bg-black hover:text-white transition duration-300"
                                >
                                    EXPLORE COLLECTION
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img
                            src={Slide2}
                            className="w-full h-auto md:h-100 lg:h-screen xl:h-140 object-cover object-center scale-120 rounded-lg"
                        />
                        <div className="absolute inset-0 flex flex-col gap-3 md:gap-4 p-8 items-cener w-2/3  justify-center ">
                            <p className="text-sm font-montserrat text-white">
                                NEW ARRIVAL
                            </p>
                            <p className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-montserrat text-white ">
                                New Collection <br /> Just Landed
                            </p>
                            <p className="text-xs md:text-sm lg:text-lg max-w-md text-white font-ysabeau">
                                Discover the latest products from top brands.{" "}
                                <br /> Designed for performance, built for
                                style.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-black w-1/3 px-5  h-10   text-xs  text-white hover:border border-white hover:bg-transparent transition duration-300"
                                >
                                    SHOP NOW
                                </button>
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-transparent  w-1/3  px-5   h-10   text-xs border border-white text-white hover:border-none hover:bg-black hover:text-white transition duration-300"
                                >
                                    EXPLORE COLLECTION
                                </button>
                            </div>
                        </div>
                        {/* <div className="absolute inset-0 bg-black/30 flex flex-col gap-3 md:gap-3 items-center justify-center">
                            <p className="text-3xl md:text-4xl lg:text-6xl xl:text-5xl text-white font-bold">
                                PLAY HARD. LOOK GOOD.
                            </p>
                            <p className="text-xs md:text-sm lg:text-md font-semibold text-white">
                                Made for sport. Designed for lifestyle.
                            </p>
                            <button
                                onClick={() => navigate("/products")}
                                className="bg-black w-30 md:w-40 h-10 font-bold text-xs  lg:text-sm text-white hover:border border-white hover:bg-transparent transition duration-300"
                            >
                                SHOP NOW
                            </button>
                        </div>*/}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;
