import { useState } from "react";
import { useNavigate } from "react-router-dom";
import basketballCollection from '../assets/category/basketball.png'
import runningCollection from '../assets/category/running.png'
import sneakersCollection from '../assets/category/sneakers.png'
import casualCollection from '../assets/category/casual.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const collection = [
    {
        image: `${basketballCollection}`,
        title: "Basketball Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere."
    },
    {
        image: `${runningCollection}`,
        title: "Running Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere."

    },
    {
        image: `${sneakersCollection}`,
        title: "Sneakers Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere."
    },
    {
        image: `${casualCollection}`,
        title: "Casual Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere."
    },
]

const CategoryCollection = () => {
    const navigate = useNavigate()

    return (
        <div className='h-auto py-12 px-2 lg:px-4 w-full'>
            {/* Headline */}
            <div className="text-center py-2">
                <p className="text-lg lg:text-3xl font-semibold">Featured Collection</p>
                <p className="text-sm lg:text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className='hidden md:flex flex-col gap-2 md:flex-row justify-around lg:mt-4'>
                {collection.map((c) => (
                    <div className='w-50 lg:w-80'>
                        <div className='overflow-hidden'>
                            <img src={c.image} className='hover:scale-110 transition duration-300' />
                        </div>
                        <div className='flex flex-col gap-5 mt-6'>
                            <p className='text-sm lg:text-lg font-semibold'>{c.title}</p>
                            <p className='text-xs lg:text-sm text-gray-500'>{c.desc}</p>
                            <p onclick={() => navigate("/products")} className='underline pb-7 text-sm font-semibold'>SHOP NOW</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Ver */}

{/* const swiper = new Swiper('.swiper', {
  slidesPerGroup: 2,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
}); */}
                {/* Slider */}
               <div className='md:hidden h-auto py-12 px-4 w-full overflow-hidden'>
    <Swiper
        modules={[ Pagination, Autoplay]}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 3000 }}
        pagination={{
            el: ".swiper-pagination",
            clickable: true
        }}
        className="h-full"
    >
        {collection.map((c, index) => (
            // ✅ SwiperSlide langsung di dalam Swiper, tanpa wrapper div
            <SwiperSlide key={index}>
                <div onClick={() => navigate("/products")} className='w-85'>

                    <div className='overflow-hidden'>
                        <img
                            src={c.image}
                            className='hover:scale-110 transition duration-300'
                        />
                    </div>

                    <div className='flex flex-col gap-5 mt-6'>
                        <p className='text-lg font-semibold'>{c.title}</p>
                        <p className='text-sm text-gray-500'>{c.desc}</p>
                        <p className='underline pb-7 text-sm font-semibold cursor-pointer'>
                            SHOP NOW
                        </p>
                    </div>

                </div>
            </SwiperSlide>
        ))}

        {/* Navigation & Pagination */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>

    </Swiper>
</div>

                {/* Indicator */}
                

        </div>
    )
}

export default CategoryCollection