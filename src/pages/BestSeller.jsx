import { useEffect, useState } from "react";
import { getBestSellingProducts, getAllProducts } from "../api/Api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const { handleAddToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts()
            setProducts(res.data);

        } catch (err) {
            console.log("Failed to fetch best sellers:", err);
        }
    }
    const bestSellingProducts = products.filter(product => product.isBestSeller === true);
    console.log("ini dari filter", bestSellingProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    const groupedProducts = [];
    for (let i = 0; i < bestSellingProducts.length; i += 2) {
        groupedProducts.push(bestSellingProducts.slice(i, i + 2));
    }

    const { discountPercent, discountPrice } = products;

    const isDiscount = discountPercent && discountPrice;
    return (
        <div className="my-12">
            <header className="flex flex-col items-center py-4">
                <p className="text-center text-lg md:text-sm lg:text-3xl px-4 font-semibold text-underline">
                    Best <span className="text-yellow-500">Deals </span>
                </p>
            </header>
            <main>
                <div className="hidden w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 md:grid grid-cols-4 place-items-center ">
                {bestSellingProducts.map((products) => (
                    <ProductCard key={products.id} product={products} productDetails={() => navigate(`/product/${products._id}`)} addToCart={() => handleAddToCart(products._id)} />
                ))}
                </div>
                <div className="w-full mt-2 lg:mt-4 px-2 md:px-3">

                    {/* Slider */}
                    <div className="md:hidden overflow-hidden">

                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                        >

                            {groupedProducts.map((group, index) => (
                                <div
                                    key={index}
                                    className="min-w-full grid grid-cols-2 gap-3 place-items-center"
                                >

                                    {group.map((products) => (
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
                                    ))}

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Slide Indicator */}
                    <div className="flex justify-center gap-2 mt-4">

                        {groupedProducts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? "w-6 bg-black"
                                        : "w-2 bg-gray-400"
                                    }`}
                            />
                        ))}

                    </div>

                </div>
            </main>
        </div>
    );
};

export default Bestseller;
