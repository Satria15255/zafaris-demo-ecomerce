import { useEffect, useState } from "react";
import { getBestSellingProducts } from "@/features/products/services/productService";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import useMediaQuery from "@/helper/useMediaQuery";
import DesktopBestSeller from "@/features/bestSeller/components/DesktopBestSeller";
import MobileBestSeller from "@/features/bestSeller/components/MobileBestSeller";

const Bestseller = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const isMobile = useMediaQuery("(max-width : 767px)");

    const fetchProducts = async () => {
        try {
            const res = await getBestSellingProducts();
            setProducts(res.data);
        } catch (err) {
            console.log("Failed to fetch best sellers:", err);
        }
    };

    console.log("ini dari filter", products);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className="mb-6 lg:mb-12  pt-16 mt-15  flex flex-col items-center w-full h-full">
            <header className="text-center py-2 space-y-2">
                <h2 className="text-lg lg:text-3xl font-semibold">
                    Best-Selling Products
                </h2>
                <p className="text-sm  text-gray-500">
                    The most frequently chosen collection, with quality that has
                    earned trust.
                </p>
            </header>
            <section className="w-full 2xl:max-w-4/5">
                <LazyMotion features={domAnimation}>
                    {isMobile ? (
                        <MobileBestSeller
                            products={products}
                            navigate={navigate}
                        />
                    ) : (
                        <DesktopBestSeller
                            products={products}
                            navigate={navigate}
                        />
                    )}
                </LazyMotion>
            </section>
        </main>
    );
};

export default Bestseller;
