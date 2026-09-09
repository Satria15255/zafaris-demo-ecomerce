import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/products") {
			const params = new URLSearchParams(location.search);

			setQuery(params.get("search") || "");
		} else {
			setQuery("");
		}
	}, [location.pathname, location.search]);

	const handleSearch = (e) => {
		e.preventDefault();

		const keyword = query.trim();

		if (!keyword) {
			navigate("/products");
			return;
		}

		navigate(`/products?search=${encodeURIComponent(keyword)}`);
	};

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
