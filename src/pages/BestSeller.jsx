import { useEffect, useState } from "react";
import { getAllProducts } from "../api/Api";
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


    return (
        <div className="my-6 lg:my-12">
            <header className="flex justify-center md:justify-between px-7 items-center py-4 border-b border-gray-300">
                <header className="text-center py-2">
                    <p className="text-lg lg:text-2xl font-semibold">Best Deals</p>
                    <p className="md:hidden text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
                </header>
                <p onClick={() => navigate("/products")} className="hidden md:flex text-lg lg:text-2xl hover:underline transition duration-300 ">View More</p>
            </header>
            <main>
                {/* Desktop Ver */}
                <div className="hidden w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 md:grid grid-cols-4 place-items-center ">
                {bestSellingProducts.map((products) => (
                    <ProductCard key={products.id} product={products} productDetails={() => navigate(`/product/${products._id}`)} addToCart={() => handleAddToCart(products._id)} />
                ))}
                </div>

                {/* Mobile Ver */}
                <div className="w-full mt-2 lg:mt-4 px-2 md:px-3">
                    {/* Slider */}
                    <div className="md:hidden">
                        <div className=" overflow-hidden">

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

                </div>
            </main>
        </div>
    );
};

export default Bestseller;
