import { useEffect, useState } from "react";
import { getAllProducts } from "../api/Api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/client/ProductCard";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { handleAddToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.log("Failed to fetch best sellers:", err);
        }
    };
    const bestSellingProducts = products.filter(
        (product) => product.isBestSeller === true,
    );
    console.log("ini dari filter", bestSellingProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="my-6 lg:my-12">
            <header className="flex justify-center px-7 items-center py-4 ">
                <header className="text-center py-2">
                    <p className="text-lg lg:text-2xl font-semibold">
                        Best Deals
                    </p>
                    <p className="text-sm lg:text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </header>
            </header>
            <main>
                {/* Desktop Ver */}
                <div className="hidden w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 md:grid grid-cols-4 place-items-center ">
                    {bestSellingProducts.map((products) => (
                        <ProductCard
                            key={products.id}
                            product={products}
                            productDetails={() =>
                                navigate(`/product/${products._id}`)
                            }
                            addToCart={() => handleAddToCart(products._id)}
                        />
                    ))}
                </div>

                {/* Mobile Ver */}
                <div className="w-full md:hidden h-auto flex justify-center mt-2 lg:mt-4 pb-4 px-2 md:px-3 overflow-hidden">
                    {/* Slider */}
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        slidesPerView={2}
                        slidesPerGroup={2}
                        autoplay={{ delay: 4000 }}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true,
                        }}
                        className="h-full "
                    >
                        {bestSellingProducts.map((products, index) => (
                            <SwiperSlide key={index} className="pb-6">
                                <ProductCard
                                    key={products._id}
                                    product={products}
                                    productDetails={() =>
                                        navigate(`/product/${products._id}`)
                                    }
                                    addToCart={() =>
                                        handleAddToCart(products._id)
                                    }
                                />
                            </SwiperSlide>
                        ))}

                        {/* Navigation & Pagination */}
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
            </main>
        </div>
    );
};

export default Bestseller;
