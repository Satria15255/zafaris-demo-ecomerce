import { useNavigate } from "react-router-dom";
import actionImage from "@/assets/heroSection/action.webp";

const CallAction = () => {
    const navigate = useNavigate();
    return (
        <div className="p-3 md:p-6 xl:p-2 w-full xl:max-w-7xl h-auto overflow-hidden ">
            <div className="relative h-full md:h-90 lg:h-120 xl:h-120 overflow-hidden group">
                <div
                    style={{ backgroundImage: `url(${actionImage})` }}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>

                {/* Content */}
                <div className="relative z-10 gap-7 md:gap-4 lg:gap-5 flex flex-col  justify-center h-full p-7  lg:ml-8 font-sans">
                    <p className="text-5xl lg:text-6xl font-montserrat">
                        Find Your Perfect <br /> Pair Faster
                    </p>
                    <p className="text-md max-w-xs lg:max-w-sm hidden md:flex font-ysabeau">
                        Filter by Category and Size to Find the Perfect of
                        Shoes.
                    </p>
                    <div>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-[#0C0C0C] text-white text-sm h-12 px-8 font-ysabeau"
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallAction;
