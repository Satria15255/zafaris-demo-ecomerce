import { useState } from "react";
import { useNavigate } from "react-router-dom";
import basketballCollection from "@/assets/category/basketball.webp";
import runningCollection from "@/assets/category/running.webp";
import sneakersCollection from "@/assets/category/sneakers.webp";
import casualCollection from "@/assets/category/casual.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const collection = [
    {
        image: `${basketballCollection}`,
        title: "Basketball Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: `${runningCollection}`,
        title: "Running Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: `${sneakersCollection}`,
        title: "Sneakers Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
    {
        image: `${casualCollection}`,
        title: "Casual Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
    },
];

const CategoryCollection = () => {
    const navigate = useNavigate();

    return (
        <section className="h-auto py-12 px-2 lg:px-4 w-full flex flex-col items-center ">
            {/* Headline */}
            <header className="text-center py-2">
                <h2 className="text-lg lg:text-3xl font-semibold">
                    Featured Collection
                </h2>
                <p className="text-sm lg:text-lg text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </header>
            <div>
                {/*Desktop Ver*/}
                <div className="hidden xl:max-w-7xl md:flex flex-col gap-2 md:flex-row justify-around lg:mt-4">
                    {collection.map((c) => (
                        <article className="w-50 md:w-1/4 lg:w-80">
                            <div className="overflow-hidden">
                                <img
                                    src={c.image}
                                    className="hover:scale-110 transition duration-300"
                                />
                            </div>
                            <div className="flex flex-col gap-5 mt-6">
                                <p className="text-sm lg:text-lg font-semibold">
                                    {c.title}
                                </p>
                                <p className="text-xs lg:text-sm text-gray-500">
                                    {c.desc}
                                </p>
                                <button
                                    onClick={() => navigate("/products")}
                                    className="underline cursor-pointer pb-7 text-gray-600 hover:text-[#0C0C0C] transition duration-200 w-1/3 md:w-1/2 text-xs lg:text-sm font-semibold"
                                >
                                    SHOP NOW
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Mobile Ver */}
                <div className="md:hidden h-auto py-12 px-4 w-full overflow-hidden">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        autoplay={{ delay: 3000 }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                        }}
                        className="h-full"
                    >
                        {collection.map((c, index) => (
                            <SwiperSlide key={index}>
                                <article
                                    onClick={() => navigate("/products")}
                                    className="w-85"
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={c.image}
                                            className="hover:scale-110 transition duration-300"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-5 mt-6">
                                        <p className="text-lg font-semibold">
                                            {c.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {c.desc}
                                        </p>
                                        <button className="underline pb-7 text-sm font-semibold cursor-pointer">
                                            SHOP NOW
                                        </button>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}

                        {/* Navigation & Pagination */}
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CategoryCollection;
