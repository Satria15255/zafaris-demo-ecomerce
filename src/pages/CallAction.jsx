import actionImage from '../assets/hero/action.jpg'

const CallAction = () => {
    return (
        <div className='relative'>
            <div className='p-6 h-120'>
                <div className='h-full'>
                    <img src={actionImage} className='w-full h-full object-cover object-center' />
                </div>
                <div className='absolute flex flex-col justify-center gap-7 inset-0 p-7 ml-8 font-sans'>
                    <p className='text-6xl max-w-lg'>Find Your Perfect Pair Faster</p>
                    <p className='text-sm'>Filter by Category and Size to Find the Perfect of Shoes</p>
                    <div>
                        <button className='bg-black text-white h-12 px-8'>Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallAction