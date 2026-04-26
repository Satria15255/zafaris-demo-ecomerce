import { motion } from "framer-motion";
import { FaCartPlus, FaStar } from "react-icons/fa";


function ProductCard({ product }) {
    const { discountPercent, discountPrice } = product;

    const isDiscount = discountPercent && discountPrice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
            whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
            transition={{ duration: 1.0 }} // Animasi selama 1 detik
            viewport={{ once: true }}
        >
            <div key={product.id} className="flex flex-col justify-center w-70 h-auto md:rounded-5 lg:rounded-lg mt-2 ">
                <div>
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md md:rounded-xl md:rounded-bottom-5 object-center" />

                </div>
                <div className="mt-2 p-2 flex flex-col space-y-4 lg:justify-center">
                    <div>
                        <p className="text-sm md:text-[15px] lg:text-xl"> {product.name}</p>
                    </div>
                    <div className="flex">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <p className="text-xs text-gray-400">  4.9 (120 Reviews)</p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <div className="flex h-[40px] items-center">
                            {isDiscount ? (
                                <div className="flex gap-1">
                                    <p className=" text-sm lg:text-lg line-through">${product.price.toFixed(2)}</p>
                                    <p className="text-sm lg:text-lg text-yellow-500 font-bold">${discountPrice.toFixed(2)}</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm lg:text-lg text-yellow-500 font-bold">${product.price.toFixed(2)}</p>
                                </>
                            )}
                        </div>
                        <p className="text-xs md:text-sm cursor-pointer lg:text-md h-10 px-5 font-sans bg-black rounded-full text-white flex items-center gap-3 hover:text-black hover:bg-white border border-gray-500 transition duration-300">
                            <span className="text">Add to Cart</span><FaCartPlus />
                        </p>
                    </div>
                </div>
            </div>

        </motion.div>
    );
}

export default ProductCard;
