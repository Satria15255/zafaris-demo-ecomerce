import { useNavigate } from "react-router-dom";
import actionImage from "@/assets/heroSection/action.webp";

const CallAction = () => {
    const navigate = useNavigate();
    return (
        <div className="p-3 md:p-6 xl:p-2 w-full xl:max-w-7xl h-auto overflow-hidden ">
            <div className="relative h-fullh-50 md:h-90 lg:h-120 xl:h-120 overflow-hidden group">
                <div
                    style={{ backgroundImage: `url(${actionImage})` }}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                ></div>

                {/* Content */}
                <div className="relative z-10 gap-2 md:gap-4 lg:gap-5 flex flex-col  justify-center h-50 md:h-full p-7  lg:ml-8 font-sans">
                    <p className="text-xl md:text-5xl lg:text-6xl font-montserrat">
                        Find Your Perfect <br /> Pair Faster
                    </p>
                    <p className="text-[9px] lg:text-lg max-w-xs leading-tight lg:max-w-sm flex font-ysabeau">
                        Filter by Category and Size <br /> to Find the Perfect
                        of Shoes.
                    </p>
                    <div>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-[#0C0C0C] text-white text-[8px] md:text-sm py-1 md:h-12 px-4 md:px-8 font-ysabeau"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallAction;
