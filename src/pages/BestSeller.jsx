import { useEffect, useState } from "react";
import { getBestSellingProducts, getAllProducts } from "../api/Api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const { handleAddToCart } = useCart();

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

    const { discountPercent, discountPrice } = products;

    const isDiscount = discountPercent && discountPrice;
    return (
        <div className="my-12">
            <header className="flex flex-col items-center py-4">
                <p className="text-center text-lg md:text-sm lg:text-3xl px-4 font-semibold text-underline">
                    Best <span className="text-yellow-500">Deals </span>
                </p>
            </header>
            <main className=" w-full mt-2 lg:mt-4 md:gap-4 px-2 md:px-3 grid grid-cols-2 md:grid-cols-4 place-items-center ">
                {bestSellingProducts.map((products) => (
                    <ProductCard key={products.id} product={products} productDetails={() => navigate(`/product/${products._id}`)} addToCart={() => handleAddToCart(products._id)} />
                ))}
            </main>
        </div>
    );
};

export default Bestseller;
