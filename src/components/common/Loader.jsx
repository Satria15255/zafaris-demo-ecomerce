const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
            <div className="relative flex items-center justify-center">
                {/* Inner Pulse */}
                <div className="w-10 h-10 rounded-full bg-white animate-pulse shadow-2xl shadow-blue-700"></div>
            </div>
        </div>
    );
};

export default Loader;
