import React from "react";

const FilterMobile = ({
    open,
    onClose,
    categories,
    size,
    filter,
    setFilter,
    handleApplyFilter,
    handleResetFilter,
}) => {
    return (
        <div className="fixed top-0 z-50 inset-0 bg-black/40 h-screen">
            <div
                className={`bg-white transform transition-transform duration-300 mt-12 rounded-t-xl max-h-[90vh] overflow-y-auto
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between p-4 border-b">
                    <h2 className="font-bold">Filter Product</h2>

                    <button onClick={onClose}>✕</button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-5 overflow-y-auto">
                    {/* Category */}
                    <div>
                        <p className="font-semibold mb-2">Category</p>

                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            category: cat,
                                        }))
                                    }
                                    className={`flex items-center justify-start py-2 px-2 rounded-xl text-sm font-semibold transition-all duration-300
                                    ${
                                        filter.category === cat
                                            ? "text-yellow-500 bg-gray-100 shadow-md"
                                            : "text-gray-500 hover:text-yellow-500"
                                    }`}
                                >
                                    - {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div>
                        <p className="font-semibold mb-2">Size</p>

                        <div className="grid grid-cols-4 gap-2">
                            {size.map((itemSize) => (
                                <button
                                    key={itemSize}
                                    type="button"
                                    onClick={() =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            size: itemSize,
                                        }))
                                    }
                                    className={`flex items-center justify-center h-[6vh] rounded-xl text-sm font-bold transition-all duration-300
                                    ${
                                        filter.size === itemSize
                                            ? "text-yellow-500 bg-gray-100 shadow-md"
                                            : "text-gray-500 hover:text-yellow-500"
                                    }`}
                                >
                                    {itemSize}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Other */}
                    <div>
                        <p className="font-semibold mb-2">Other</p>

                        <label className="flex items-center gap-2 mb-3">
                            <input
                                type="checkbox"
                                checked={filter.latest}
                                onChange={() =>
                                    setFilter((prev) => ({
                                        ...prev,
                                        latest: !prev.latest,
                                    }))
                                }
                            />
                            New Arrival
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filter.discount}
                                onChange={() =>
                                    setFilter((prev) => ({
                                        ...prev,
                                        discount: !prev.discount,
                                    }))
                                }
                            />
                            Discount
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex gap-2">
                    <button
                        onClick={() => {
                            handleResetFilter();
                        }}
                        className="w-1/3 border border-gray-300 py-3 rounded-lg"
                    >
                        Reset
                    </button>

                    <button
                        onClick={() => {
                            handleApplyFilter();
                            onClose();
                        }}
                        className="w-2/3 bg-black text-white py-3 rounded-lg"
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterMobile;
