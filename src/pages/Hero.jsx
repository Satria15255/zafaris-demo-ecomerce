import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import Slide1 from '../assets/hero/hero1.jpg'
import Slide2 from '../assets/hero/hero2.jpg'
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
    return (
        <div className="w-full flex justify-center h-auto">
            <Swiper modules={[Autoplay, EffectFade]} effect="fade" autoplay={{ delay: 4000 }} loop className=" h-full">
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide1} className="w-full h-screen object-cover " />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-8 items-center justify-center ">
                            <p className="text-lg font-semibold text-uppercase text-white">LOREM IPSUM DOLOR SIT</p>
                            <p className="text-5xl text-white font-semibold">Lorem ipsum dolor sit amet.</p>
                            <button className='bg-black w-40 h-10 font-bold text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center items-center">
                        <img src={Slide2} className="w-full h-screen object-cover " />
                        <div className="absolute inset-0 bg-black/30 flex flex-col gap-8 items-center justify-center">
                            <p className="text-lg font-semibold text-white">LOREM IPSUM DOLOR SIT</p>
                            <p className="text-5xl text-white font-semibold"> Walk in Comfort, Step in Style.</p>
                            <button className='bg-black w-40 h-10 font-bold text-sm text-white hover:border border-white hover:bg-transparent transition duration-300'>Shop Now</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Hero