import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import Slide1 from '../assets/heroSection/hero12.jpg'
import Slide2 from '../assets/heroSection/hero2.jpg'
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
    return (
        <div className="w-full md:p-6 pt-7 md:pt-16 md:mt-16 flex justify-center h-auto">
            <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4000 }} loop className=" h-full">
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide1} className="w-full h-auto md:h-screen object-cover rounded-lg " />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-5 items-center justify-center ">
                            <p className="text-xs md:text-md font-semibold text-uppercase text-white">Comfort, speed, and unstoppable style</p>
                            <p className="text-xl md:text-5xl text-white font-bold">NEW ERA OF MOTION</p>
                            <button className='bg-black w-30 md:w-40 h-10 font-bold text-xs md:text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>SHOP NOW</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide2} className="w-full h-auto md:h-screen object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-5 items-center justify-center">
                            <p className="text-xs md:text-md font-semibold text-white">Made for sport. Designed for lifestyle.</p>
                            <p className="text-xl md:text-5xl text-white font-bold">PLAY HARD. LOOK GOOD.</p>
                            <button className='bg-black w-30 md:w-40 h-10 font-bold text-xs  md:text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>SHOP NOW</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Hero