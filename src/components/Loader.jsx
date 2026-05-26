const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-28 h-28 rounded-full border-[6px] border-blue-900 border-t-white animate-spin"></div>

                {/* Middle Ring */}
                <div className="absolute w-20 h-20 rounded-full border-[5px] border-black border-b-blue-500 animate-spin [animation-direction:reverse] [animation-duration:1.2s]"></div>

                {/* Inner Pulse */}
                <div className="w-10 h-10 rounded-full bg-white animate-pulse shadow-2xl shadow-blue-700"></div>
            </div>
        </div>
    );
}

export default Loader
