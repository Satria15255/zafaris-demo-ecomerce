import { useState } from "react";
import basketballCollection from '../assets/category/basketball.png'
import runningCollection from '../assets/category/running.png'
import sneakersCollection from '../assets/category/sneakers.png'
import casualCollection from '../assets/category/casual.png'

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

    return (
        <div className='h-auto py-12 px-4 w-full'>
            <div className='hidden md:flex flex-col md:flex-row justify-around'>
                {collection.map((c) => (
                    <div className='w-80'>
                        <div className='overflow-hidden'>
                            <img src={c.image} className='hover:scale-110 transition duration-300' />
                        </div>
                        <div className='flex flex-col gap-5 mt-6'>
                            <p className='text-lg font-semibold'>{c.title}</p>
                            <p className='text-sm text-gray-500'>{c.desc}</p>
                            <p className='underline pb-7 text-sm font-semibold'>SHOP NOW</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Ver */}
            <div className='nd:hidden h-auto py-12 px-4 w-full overflow-hidden'>

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

                            <div className='w-80'>

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