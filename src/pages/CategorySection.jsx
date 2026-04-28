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
    return (
        <div className='h-auto py-12 px-4 w-full bg-[#FAFAFA]'>
            <div className='flex justify-around'>
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
        </div>
    )
}

export default CategoryCollection