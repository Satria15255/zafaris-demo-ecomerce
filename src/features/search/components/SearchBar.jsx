import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname !== "/search") {
			setQuery("");
		}
	}, [location.pathname]);

	const handleSearch = (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		navigate(`/search?q=${encodeURIComponent(query.trim())}`);
	};

	return (
		<form onSubmit={handleSearch} className="w-full">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeHolder="Search Products...."
				className="w-full border border-gray-300 px-2 rounded-2xl font-ysabeau py-1"
			/>
		</form>
	);
};

export default SearchBar;
