import { m } from "framer-motion";
import { FaCartPlus, FaStar } from "react-icons/fa";
import {
    IoBagHandleOutline,
    IoHeartOutline,
    IoSearchOutline,
} from "react-icons/io5";
import { useProductModal } from "@/context/ProductModalContext";
import { useFavorite } from "@/context/FavoriteContext";
import { optimizeCloudinaryImage } from "@/helper/optimizeCloudinaryImage";

function ProductCard({ product, productDetails, openModal, productModal }) {
    const { discountPercent, discountPrice } = product;
    const { openProductModal } = useProductModal();
    const { isFavorite, toggleFavorite } = useFavorite();

    const favorite = isFavorite(product._id);

    const isDiscount = discountPercent && discountPrice;

    return (
        <m.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            key={product.id}
            className="relative flex flex-col justify-center w-full h-auto md:rounded-5 lg:rounded-xl mt-2 "
        >
            <div className="w-full h-auto">
                <img
                    src={optimizeCloudinaryImage(product.image, 500)}
                    alt={product.name}
                    srcSet={`
            ${optimizeCloudinaryImage(product.image, 300)} 300w,
            ${optimizeCloudinaryImage(product.image, 500)} 500w,
            ${optimizeCloudinaryImage(product.image, 700)} 700w
        `}
                    sizes="
            (max-width: 640px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
        "
                    width="500"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover rounded-md md:rounded-xl md:rounded-bottom-5 object-center"
                />
                <div>
                    {product.isBestSeller === true && (
                        <div>
                            <p className="absolute top-2 left-2 bg-yellow-600 text-white text-xs xl:text-sm font-ysabeau px-2 xl:px-4 xl:py-2 py-1 rounded-xl">
                                Best Seller
                            </p>
                        </div>
                    )}
                </div>
                <div className="absolute top-0 right-0 p-2 duration-200 flex justify-start  ">
                    <button
                        onClick={() => toggleFavorite(product._id)}
                        className={`p-3 rounded-full  text-lg lg:text-xl shadow-lg hover:bg-[#0C0C0C] hover:text-white transition duration-200 ${favorite ? "bg-black text-white" : "bg-white text-[#0C0C0C]"}`}
                    >
                        <IoHeartOutline />
                    </button>
                </div>
            </div>
            <div className="mt-2 p-2 flex flex-col  space-y-2 md:space-y-2 lg:justify-center">
                <div className="h-10 md:h-12 flex items-center">
                    <p className="text-sm  md:text-[15px] lg:text-xl xl:text-md">
                        {" "}
                        {product.name}
                    </p>
                </div>

                <div className="flex justify-between items-center ">
                    <div className="flex h-[40px] items-center justify-center font-montserrat">
                        {isDiscount ? (
                            <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                                <p className=" text-sm lg:text-lg xl:text-md line-through">
                                    ${product.price.toFixed(2)}
                                </p>
                                <p className="text-sm lg:text-lg xl:text-md text-yellow-600 font-bold">
                                    ${discountPrice.toFixed(2)}
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm lg:text-lg xl:text-md text-yellow-600 font-bold">
                                    ${product.price.toFixed(2)}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex gap-1 lg:gap-2">
                        <button
                            onClick={() => productDetails(product)}
                            className="p-3 rounded-full text-lg md:text-sm lg:text-xl text-white bg-[#0C0C0C] shadow-xl border border-gray-100 hover:text-[#0C0C0C] hover:bg-white transition duration-200"
                        >
                            <IoSearchOutline />
                        </button>
                        <button
                            onClick={() => openProductModal(product)}
                            className="p-3 rounded-full text-lg md:text-sm lg:text-xl text-white bg-[#0C0C0C] shadow-xl border border-gray-100 hover:text-[#0C0C0C] hover:bg-white transition duration-200"
                        >
                            <IoBagHandleOutline />
                        </button>
                    </div>
                </div>
            </div>
        </m.article>
    );
}

export default ProductCard;
