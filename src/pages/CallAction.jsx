import actionImage from '../assets/heroSection/action.jpg'

const CallAction = () => {
    return (
        <div className='p-3 md:p-6 h-120 overflow-hidden '>
            <div className='relative h-full overflow-hidden group'>

                <div
                    style={{ backgroundImage: `url(${actionImage})` }}
                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                ></div>

                {/* Content */}
                <div className='relative z-10 gap-7 flex flex-col justify-center h-full p-7 md:ml-8 font-sans'>
                    <p className='text-5xl lg:text-6xl max-w-lg'>Find Your Perfect Pair Faster</p>
                    <p className='text-sm max-w-xs hidden '>Filter by Category and Size to Find the Perfect of Shoes</p>
                    <div>
                        <button className='bg-black text-white h-12 px-8'>Shop Now</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CallAction