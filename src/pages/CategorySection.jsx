import basketballCollection from '../assets/category/basketball.png'
import runningCollection from '../assets/category/running.png'
import sneakersCollection from '../assets/category/sneakers.png'
import casualCollection from '../assets/category/casual.png'

const collection = [
    {
        image: `${basketballCollection}`
    },
    {
        image: `${runningCollection}`
    },
    {
        image: `${sneakersCollection}`
    },
    {
        image: `${casualCollection}`
    },
]

const CategoryCollection = () => {
    return (
        <div className='h-screen w-full bg-[#FAFAFA]'>
            <div className='flex justify-around'>
                {collection.map((c) => (
                    <div className='w-1/5'>
                        <img src={c.image} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryCollection