import { useNavigate } from "react-router-dom";
import discountImage from "@/assets/discountImage(1).webp";

const OnSale = () => {
    const navigate = useNavigate();
    return (
        <main className=" mt-6 flex justify-center w-full h-auto">
            <div className="w-100 md:w-full xl:max-w-7xl h-50 md:h-60 lg:h-80 flex  bg-[#0C0C0C] ">
                <picture className="w-2/5">
                    <source
                        media="(max-width: 640px)"
                        srcSet={discountImage}
                        className="w-full h-full  object-cover object-center"
                    />
                    <img
                        src="/homeSection/discountImage.webp"
                        alt="discountImage"
                        width="1024"
                        height="1278"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full  object-cover object-center"
                    />
                </picture>
                <header className="w-3/5 text-white flex p-4 flex-col justify-center gap-1 md:gap-3 font-montserrat">
                    <p className="text-[8px]  md:text-xs lg:text-sm">
                        LIMITED OFFER
                    </p>
                    <p className="text-lg md:text-4xl lg:text-5xl xl:text-6xl">
                        30% off every day for <br /> our dream products
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="py-1 lg:py-2 text-[7px] md:text-xs lg:text-lg px-4 rounded-lg text-black w-1/3 lg:w-1/5 bg-white border border-gray-300"
                    >
                        Get Now
                    </button>
                </header>
            </div>
        </main>
    );
};

export default OnSale;
