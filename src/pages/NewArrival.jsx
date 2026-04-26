import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getLatestProducts, addToCart } from "../api/Api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ProductList() {
    const [products, setProducts] = useState([]);

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
        <div className="mt-12 md:mt-3 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }} // Awalnya transparan dan turun 50px
                whileInView={{ opacity: 1, y: 0 }} // Saat muncul, fade-in & naik ke atas
                transition={{ duration: 1.0 }} // Animasi selama 0.6 detik
                viewport={{ once: true }}
            >
                <header className="text-center py-4">
                    <p className="text-lg md:text-sm lg:text-3xl font-bold text-center mt-6">
                        Latest <span className="text-yellow-500">Arrival</span>
                    </p>
                    <p className="text-xs md:text-sm font-semibold">Our Newest Product</p>
                </header>
            </motion.div>
            <main className="grid py-2 h-45 grid-cols-2 md:grid-cols-4 gap-2 md:mt-2 lg:mt-4 place-items-center p-2">
                {products.map((products) => (
                    <ProductCard key={products.id} product={products} addToCart={() => addToCartItems(products._id)} />
                ))}
            </main>
        </div>
    );
}

export default ProductList;
