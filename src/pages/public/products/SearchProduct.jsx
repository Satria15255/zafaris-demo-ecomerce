import { useSearchParams, useNavigate } from "react-router-dom";
import { getProductSearch } from "@/features/products/services/productService";
import { useState, useEffect } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { TbMoodSadSquint } from "react-icons/tb";

const SearchProduct = () => {
	const [searchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	const query = searchParams.get("q");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await getProductSearch(query);
				setProducts(res.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (query) {
			fetchProducts();
		}
	}, [query]);

	return (
		<main className="h-auto min-h-screen flex flex-col pt-4 mt-8 lg:mt-16 md:pt-16">
			<div className="xl:flex justify-center">
				{products.length > 0 ? (
					<div className="grid grid-cols-2 w-full xl:max-w-7xl md:grid-cols-4  gap-2 p-2">
						{products.map((product) => (
							<div key={product._id}>
								<ProductCard
									product={product}
									productDetails={() =>
										navigate(`/product/${products._id}`)
									}
								/>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-col min-h-screen items-center justify-center gap-4 font-ysabeau">
						<div className="text-gray-700 text-8xl">
							<TbMoodSadSquint />
						</div>
						<p className="text-center  max-w-3/5 text-xl lg:text-3xl lg:max-w-2/5 text-gray-600">
							Oops, sorry—it looks like the product you're looking
							for isn't available...
						</p>
						<button
							onClick={() => navigate("/products")}
							className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
						>
							Continue Shopping
						</button>
					</div>
				)}
			</div>
		</main>
	);
};

export default SearchProduct;
