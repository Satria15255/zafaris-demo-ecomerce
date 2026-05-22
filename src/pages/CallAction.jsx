import actionImage from '../assets/heroSection/action.jpg'

const CallAction = () => {
    return (
        <div className='p-3 md:p-6 h-auto overflow-hidden '>
            <div className='relative h-full md:h-90 lg:h-120 overflow-hidden group'>

                <div
                    style={{ backgroundImage: `url(${actionImage})` }}
                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                ></div>

                {/* Content */}
                <div className='relative z-10 gap-7 md:gap-4 lg:gap-7 flex flex-col justify-center h-full p-7  lg:ml-8 font-sans'>
                    <p className='text-5xl lg:text-7xl max-w-lg md:max-w-sm lg:max-w-xl'>Find Your Perfect Pair Faster</p>
                    <p className='text-sm max-w-xs lg:max-w-sm hidden md:flex'>Filter by Category and Size to Find the Perfect of Shoes</p>
                    <div>
                        <button className='bg-black text-white h-12 px-8'>Shop Now</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CallAction