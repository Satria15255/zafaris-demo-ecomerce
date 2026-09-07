import ProductCard from "@/features/products/components/ProductCard";
import { useFavorite } from "@/context/FavoriteContext";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, loadingFavorites } = useFavorite();
    const navigate = useNavigate();

    if (loadingFavorites) {
        return <p>Loading...</p>;
    }

    return (
        <main className="h-auto min-h-screen flex flex-col items-center pt-4 mt-8 lg:mt-16 md:pt-16">
            <div className="w-full xl:max-w-7xl">
                <header className="flex justify-start w-full border-b border-gray-300 h-12">
                    <p className="text-2xl font-semibold mb-6">
                        Liked Products
                    </p>
                </header>

                <section className="">
                    {favorites.length === 0 ? (
                        <div className="flex flex-col  items-center justify-center gap-4 font-ysabeau mt-12">
                            <div className="text-gray-700 text-8xl">
                                <RiEmotionUnhappyLine />
                            </div>
                            <p className="text-center  max-w-3/5 text-xl lg:text-3xl lg:max-w-2/5 text-gray-600">
                                Oops, sorry—it looks like you don't have any
                                favorite products yet....
                            </p>
                            <button
                                onClick={() => navigate("/products")}
                                className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {favorites.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </section>
                    )}
                </section>
            </div>
        </main>
    );
};

export default FavoritesPage;
