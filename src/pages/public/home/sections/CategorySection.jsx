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
        url: "Basketball",
    },
    {
        image: `${runningCollection}`,
        title: "Running Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
        url: "Running",
    },
    {
        image: `${sneakersCollection}`,
        title: "Sneakers Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
        url: "Sneakers",
    },
    {
        image: `${casualCollection}`,
        title: "Casual Collection",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore itaque facere.",
        url: "Casual",
    },
];

const CategoryCollection = () => {
    const navigate = useNavigate();

    return (
        <main className="h-auto pt-16 mt-15  w-full flex flex-col items-center ">
            {/* Headline */}
            <header className="text-center py-2 space-y-2">
                <h2 className="text-lg lg:text-3xl font-semibold">
                    Explore the Collection
                </h2>
                <p className="text-sm  text-gray-500">
                    From casual to sporty, find the perfect pair.
                </p>
            </header>

            {/*Desktop Ver*/}
            <section className="flex-col gap-2 grid grid-cols-4 w-full justify-around px-4 lg:mt-4">
                {collection.map((c) => (
                    <article
                        onClick={() => navigate(`/products?category=${c.url}`)}
                        className="w-full"
                    >
                        <div className="relative   aspect-square w-full">
                            <img
                                src={c.image}
                                alt={c.title}
                                loading="lazy"
                                decoding="async"
                                width="432"
                                height="756"
                                className=" w-full aspect-square object-bottom object-cover "
                            />
                            <span className="absolute bg-white top-2 right-2 w-7 h-7 flex items-center justify-center text-sm rounded-full">
                                12
                            </span>
                        </div>
                        <div className="flex flex-col items-start gap-5 mt-6">
                            <p className="text-sm lg:text-lg font-semibold">
                                {c.title}
                            </p>
                        </div>
                    </article>
                ))}
            </section>

            {/* Mobile Ver */}
            <section className="md:hidden h-auto py-12   w-full overflow-hidden">
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
                                className="w-90"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        loading="lazy"
                                        decoding="async"
                                        width="432"
                                        height="756"
                                        className="hover:scale-110 transition duration-300"
                                    />
                                </div>

                                <div className="flex flex-col items-start gap-5 mt-6">
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
            </section>
        </main>
    );
};

export default CategoryCollection;
