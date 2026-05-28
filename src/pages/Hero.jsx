import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import Slide1 from '../assets/heroSection/hero12.jpg'
import Slide2 from '../assets/heroSection/hero2.jpg'
import "swiper/css";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full  lg:p-4 pt-14 lg:pt-16 md:mt-16 flex justify-center h-auto">
            <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4000 }} loop className=" h-full">
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide1} className="w-full h-auto md:h-100 lg:h-screen object-cover rounded-lg " />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-3 md:gap-3  items-center justify-center ">
                            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">NEW ERA OF MOTION</p>
                            <p className="text-xs md:text-sm lg:text-md font-semibold text-uppercase text-white">Comfort, speed, and unstoppable style</p>
                            <button onClick={() => navigate("/products")} className='bg-black w-30 md:w-40 h-10 font-bold text-xs lg:text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>SHOP NOW</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide2} className="w-full h-auto md:h-100 lg:h-screen object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-3 md:gap-3 items-center justify-center">
                            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">PLAY HARD. LOOK GOOD.</p>
                            <p className="text-xs md:text-sm lg:text-md font-semibold text-white">Made for sport. Designed for lifestyle.</p>
                            <button onClick={() => navigate("/products")} className='bg-black w-30 md:w-40 h-10 font-bold text-xs  lg:text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>SHOP NOW</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Hero