export const FILTER_GROUPS = [
	{
		key: "category",

		label: "Collection",
		options: ["Basketball", "Running", "Sneakers", "Casual"],
	},

	{
		key: "size",
		label: "Size",
		options: ["38", "39", "40", "41", "42", "43", "44"],
	},
];

export const emptyFilters = () => ({
	category: [],
	size: [],
	discount: false,
	latest: false,
});

export const readFilters = (params) => ({
	category: params.getAll("category"),
	size: params.getAll("size"),
	discount: params.get("discount") === "true",
	latest: params.get("latest") === "true",
});

export const createFilterParams = (currentParams, filters) => {
	const params = new URLSearchParams(currentParams);

	//  pertahankan parameter search
	["category", "size", "discount", "latest", "page"].forEach((key) =>
		params.delete(key),
	);

	filters.category.forEach((value) => {
		params.append("category", value);
	});

	filters.size.forEach((value) => {
		params.append("size", value);
	});

	if (filters.discount) {
		params.set("discount", "true");
	}

	if (filters.latest) {
		params.set("latest", "true");
	}

	return params;
};
