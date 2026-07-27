import { motion } from "framer-motion";
import { FaCartPlus, FaStar } from "react-icons/fa";
import {
    IoBagHandleOutline,
    IoHeartOutline,
    IoSearchOutline,
} from "react-icons/io5";

function ProductCard({ product, productDetails }) {
    const { discountPercent, discountPrice } = product;

    const isDiscount = discountPercent && discountPrice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
            whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
            transition={{ duration: 1.0 }} // Animasi selama 1 detik
            viewport={{ once: true }}
        >
            <div
                key={product.id}
                className="relative flex flex-col justify-center w-45 lg:w-70 xl:w-80 h-auto md:rounded-5 lg:rounded-xl mt-2 "
            >
                <div className="w-full h-auto">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-md md:rounded-xl md:rounded-bottom-5 object-center"
                    />
                    {product.isBestSeller === true && (
                        <div>
                            <p className="absolute top-2 left-2 bg-yellow-600 text-white text-xs font-ysabeau px-2 py-1 rounded">
                                Best Seller
                            </p>
                        </div>
                    )}
                    <div className="absolute mt-2 opacity-0 translate-y-10 z-100 inset-0 hover:opacity-100 hover:translate-y-0 transition-all duration-200 flex justify-center items-center top-30">
                        <div className="flex gap-3">
                            <p
                                onClick={() => productDetails(product)}
                                className="p-2 rounded-full bg-white text-[#0C0C0C] shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200"
                            >
                                <IoSearchOutline />
                            </p>
                            <p className="p-2 rounded-full bg-white text-[#0C0C0C] shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200">
                                <IoBagHandleOutline />
                            </p>
                            <p className="p-2 rounded-full bg-white text-[#0C0C0C] shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200">
                                <IoHeartOutline />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-2 p-2 flex flex-col items-center space-y-2 md:space-y-2 lg:justify-center">
                    <div className="h-10 md:h-12 flex items-center">
                        <p className="text-sm  md:text-[15px] lg:text-xl xl:text-md">
                            {" "}
                            {product.name}
                        </p>
                    </div>

                    <div className="flex justify-between items-center ">
                        <div className="flex h-[40px] items-center justify-center font-montserrat">
                            {isDiscount ? (
                                <div className="flex gap-2 justify-center items-center">
                                    <p className=" text-sm lg:text-lg xl:text-sm line-through">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <p className="text-sm lg:text-lg xl:text-sm text-yellow-600 font-bold">
                                        ${discountPrice.toFixed(2)}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm lg:text-lg xl:text-sm text-yellow-600 font-bold">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
