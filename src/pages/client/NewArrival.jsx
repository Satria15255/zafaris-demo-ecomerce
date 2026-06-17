import { useEffect, useState } from "react";
import ProductCard from "@/components/client/ProductCard";
import { getLatestProducts, addToCart } from "@/api/Api";
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
        <div className="pt-12 md:mt-3 mb-8 h-auto">
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
            <main className="grid py-2 h-auto grid-cols-2 md:grid-cols-4 gap-2 md:mt-2 lg:mt-4 place-items-center p-2">
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
            </main>
            <footer className="text-center py-4">
                <button
                    onClick={() => navigate("/products")}
                    className="text-sm lg:text-lg bg-black text-white px-10 py-2 rounded-3xl hover:bg-white hover:text-black border border-gray-300 transition duration-200"
                >
                    View All
                </button>
            </footer>
        </div>
    );
}

export default ProductList;
