import { useState } from "react";
import basketballCollection from '../assets/category/basketball.png'
import runningCollection from '../assets/category/running.png'
import sneakersCollection from '../assets/category/sneakers.png'
import casualCollection from '../assets/category/casual.png'
import { useNavigate } from "react-router-dom";

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
    const [currentSlide, setCurrentSlide] = useState(0);
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
            <div className='md:hidden h-auto py-12 px-4 w-full overflow-hidden'>

                {/* Slider */}
                <div
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`
                    }}
                >

                    {collection.map((c, index) => (
                        <div
                            key={index}
                            className='min-w-full flex justify-center'
                        >
                            <div onClick={() => navigate("/products")} className='w-90'>

                                <div className='overflow-hidden'>
                                    <img
                                        src={c.image}
                                        className='hover:scale-110 transition duration-300'
                                    />
                                </div>

                                <div className='flex flex-col gap-5 mt-6'>
                                    <p className='text-lg font-semibold'>
                                        {c.title}
                                    </p>

                                    <p className='text-sm text-gray-500'>
                                        {c.desc}
                                    </p>

                                    <p className='underline pb-7 text-sm font-semibold cursor-pointer'>
                                        SHOP NOW
                                    </p>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                {/* Indicator */}
                <div className='flex justify-center gap-2 mt-6'>

                    {collection.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-300 rounded-full h-2 ${currentSlide === index
                                ? "w-6 bg-black"
                                : "w-2 bg-gray-400"
                                }`}
                        />
                    ))}

                </div>

            </div>
        </div>
    )
}

export default CategoryCollection