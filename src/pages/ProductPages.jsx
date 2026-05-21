import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getLatestProducts, getDiscountProducts } from "../api/Api";
import bgProductPages from "../assets/hero3.png";
import { MdFilterList } from "react-icons/md";
import FilterMobile from "../components/FilterMobile";
import FilterSidebar from "../components/FilterSidebar";
import { useNavigate } from "react-router-dom";

function ProductPages({ onAddToCart, onOpenModal }) {
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState({
        category: "All",
        size: "All",
        search: "",
        latest: false,
        discount: false,
    });
    const productsPerPage = 12;
    const categories = ["All", "Basketball", "Sneakers", "Running", "Casual"];
    const size = ["All", 38, 39, 40, 41, 42, 43, 44];
    const navigate = useNavigate()

    // Function Fetch All Products
    const fetchProducts = useCallback(async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Function Fetch New Arrival Products
    const fetchLatestProducts = useCallback(async () => {
        try {
            const res = await getLatestProducts();
            console.log(res.data);
            setLatestProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        fetchLatestProducts();
    }, [fetchLatestProducts]);

    // Function Fetch Discount Products
    const normalizeDiscount = (discount) => {
        return {
            ...discount.productId,
            price: Number(discount.productId.price),
            isDiscount: true,
            discountPercent: Number(discount.discountPercent),
            discountPrice: Number(discount.discountPrice),
            expiresAt: discount.expiresAt,
        };
    };

    const fetchDiscountProducts = useCallback(async () => {
        try {
            const res = await getDiscountProducts();
            const normalized = res.data.map(normalizeDiscount);
            console.log(res.data);
            setDiscountProducts(normalized);

            setProducts((prev) =>
                prev.map((p) => {
                    const found = normalized.find((d) => d._id === p._id);
                    return found ? found : p;
                }),
            );
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        fetchDiscountProducts();
    }, [fetchDiscountProducts]);

    // Function Filter Products

    const filterProducts = () => {
        const source = filter.discount ? discountProducts : filter.latest ? latestProducts : products || [];
        return source.filter((products) => {
            const matchCategory = filter.category === "All" || products.category === filter.category;
            const matchSize = filter.size === "All" || (Array.isArray(products.sizes) && products.sizes.includes(Number(filter.size)));
            const matchSearch = filter.search.trim() === "" || products.name.toLowerCase().includes(filter.search.toLocaleLowerCase());
            return matchCategory && matchSize && matchSearch;
        });
    };
    const filteredProducts = filterProducts();

    // Function Products Pagination
    useEffect(() => {
        setCurrentPages(1);
    }, [filter.category, filter.size, filter.latest, filter.discount, filter.search]);
    const indexOfLast = currentPages * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="mt-16 pt-16 p-1 md:p-2">
            <div style={{ backgroundImage: `url(${bgProductPages})` }} className="z-0 flex flex-col justify-center md:justify-between items-center h-[25vh] lg:h-[50vh] bg-center bg-cover rounded-lg md:rounded-3xl mt-9 mb-2 md:mb-4">
                <div className="hidden md:flex bg-transparant font-light ml-5">.</div>
                <p className="text-4xl md:text-8xl font-bold text-white">Product</p>
                <div className="hidden md:flex justify-between items-center gap-2 w-[50vh] md:w-4/5 lg:w-[180vh] rounded-t-2xl bg-white  h-[6vh] lg:h-[9vh] px-3">
                    <p className="hidden lg:flex font-bold text-xs md:text-sm lg:text-lg">Give All You Want</p>
                    <div className="flex justify-center w-full lg:w-1/5 mt-3">
                        <input type="text" placeholder="Search Products..." value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))} className="w-full px-2 h-[5vh] text-sm border rounded-xl" />
                    </div>
                    <button onClick={() => setFilterOpen(true)} className="hidden md:flex lg:hidden p-4 mt-3 items-center text-sm  border rounded-lg ">
                        <span className="flex items-center">
                            <MdFilterList />
                        </span>
                    </button>
                </div>
            </div>
            {/* Product Section */}
            <div className="flex justify-center ">
                <div className="flex flex-col justify-center md:flex-row w-[100vh] md:w-[180vh] px-2">
                    {/* Sidebar Filter Left*/}
                    <FilterSidebar categories={categories} size={size} filter={filter} setFilter={setFilter} />

                    {/* Filter Mobile Version */}
                    <div className="md:hidden w-30 flex justify-center gap-3 mb-2 mt-2 mr-2">
                        <div className="flex md:hidden justify-center w-full">
                            <input type="text" placeholder="Search Products..." value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))} className="w-full px-2 h-[5vh] text-sm border rounded-xl" />
                        </div>
                        <button onClick={() => setFilterOpen(true)} className="flex px-3 items-center text-sm  border rounded-lg ">
                            <span className="flex items-center">
                                <MdFilterList />
                            </span>
                        </button>
                    </div>

                    {/* Products Section Right */}
                    <div className="flex flex-col justify-between w-full lg:w-4/5 min-h-[100vh]">
                        <div className="grid grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-3 gap-3">
                            {currentProducts.length === 0 && <p className="text-center col-span-3">No products found.</p>}
                            {currentProducts.length > 0 && currentProducts.map((products) => <ProductCard product={products} onAddToCart={onAddToCart} productDetails={() => navigate(`/product/${products._id}`)} />)}
                        </div>
                        <div className="flex justify-between w-full py-4">
                            <button className="font-semibold text-xs md:text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200" onClick={() => setCurrentPages((prev) => Math.max(prev - 1, 1))} disabled={currentPages === 1}>
                                ← Previous
                            </button>
                            <div>
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPages(idx + 1)}
                                        className={`px-2 md:px-3 py-1 text-xs md:text-lg rounded hover:bg-gray-100 hover:font-bold transition-all duration-300 ease-in-out ${currentPages === idx + 1 ? "font-bold bg-gray-100" : ""}`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="font-semibold text-xs md:text-lg w-25 rounded h-[5vh] hover:shadow-md transition duration-200"
                                onClick={() => setCurrentPages((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPages === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
                {filterOpen && <FilterMobile open={filterOpen} onClose={() => setFilterOpen(false)} categories={categories} sizes={size} currentFilter={filter} onApply={(newFilter) => setFilter(newFilter)} />}

            </div>
        </div>
    );
}

export default ProductPages;
