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
        <main className="h-auto pt-16  w-full flex flex-col items-center ">
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
            <section className="flex-col gap-2 grid grid-cols-2 md:grid-cols-4 w-full justify-around px-4 lg:mt-4 2xl:max-w-4/5">
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
                            <span className="absolute bg-white top-2 right-2 w-auto px-4 py-2 flex items-center justify-center text-sm  ">
                                12 Items
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
        </main>
    );
};

export default CategoryCollection;
