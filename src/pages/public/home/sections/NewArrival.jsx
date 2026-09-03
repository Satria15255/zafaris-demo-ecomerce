import { useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { getLatestProducts } from "@/features/products/services/productService";
import { addToCart } from "@/features/cart/services/cartService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await getLatestProducts();
            console.log(res.data);
            setProducts(res.data.slice(0, 8));
        } catch (err) {
            console.err("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCartItems = async (productId) => {
        try {
            const res = await addToCart(productId, 1);
            toast.success("Product added to cart");
            console.log("Product add to cart", res.data);
        } catch (err) {
            toast.error("Failed to add product to cart");
            console.log("Failed add product", err);
        }
    };

    return (
        <section className="pt-12 md:mt-3 mb-8 h-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
                whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
                transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
                viewport={{ once: true }}
            >
                <header className="text-center  py-2">
                    <p className="text-lg lg:text-3xl font-semibold">
                        New Arrivals
                    </p>
                    <p className="text-sm lg:text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </header>
            </motion.div>
            <article className="grid py-2 xl:min-w-7xl h-auto grid-cols-2 md:grid-cols-4 gap-2 md:mt-2 lg:mt-4 place-items-center p-2">
                {products.map((products) => (
                    <ProductCard
                        key={products.id}
                        product={products}
                        productDetails={() =>
                            navigate(`/product/${products._id}`)
                        }
                        addToCart={() => addToCartItems(products._id)}
                    />
                ))}
            </article>
            <footer className="text-center py-4">
                <button
                    onClick={() => navigate("/products")}
                    className="text-sm lg:text-lg px-2 text-gray-700 font-ysabeau py-1 border-b  border-gray-700  hover:border-black  hover:bg-white hover:text-black  transition duration-300"
                >
                    View All
                </button>
            </footer>
        </section>
    );
}

export default ProductList;
