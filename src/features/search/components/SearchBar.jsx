import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	const isProductPage = location.pathname === "/products";

	useEffect(() => {
		if (!isProductPage) {
			setQuery("");
		}
	}, [location.pathname, isProductPage]);

	const handleSearch = (e) => {
		e.preventDefault();

		const keyword = query.trim();

		if (!keyword) return;

		navigate(`/products?search=${encodeURIComponent(keyword)}`);

		setQuery("");
	};

	if (isProductPage) {
		return null;
	}

	return (
		<form onSubmit={handleSearch} className="w-full">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search Products..."
				className="w-full border border-gray-300 px-2 rounded-2xl font-ysabeau py-1"
			/>
		</form>
	);
};

export default SearchBar;
