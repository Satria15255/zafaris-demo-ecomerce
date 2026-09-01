import React, { useState } from "react";

const FilterMobile = ({ open, onClose, categories, sizes, currentFilter, onApply }) => {
    const [tempFilter, setTempFilter] = useState(currentFilter);

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
                <div className="p-4 space-y-3 overflow-y-auto">
                    {/* Category */}
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setTempFilter((p) => ({ ...p, category: cat }))}
                            className={`block w-full text-left py-2
              ${tempFilter.category === cat ? "font-bold" : ""}`}
                        >
                            {cat}
                        </button>
                    ))}

                    {/* Size */}
                    <div className="grid grid-cols-4 gap-2">
                        {sizes.map((s) => (
                            <button
                                key={s}
                                onClick={() => setTempFilter((p) => ({ ...p, size: s }))}
                                className={`py-2 border rounded
                ${tempFilter.size === s ? "bg-black text-white" : ""}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <label className="flex gap-2">
                        <input type="checkbox" checked={tempFilter.latest} onChange={() => setTempFilter((p) => ({ ...p, latest: !p.latest }))} />
                        New Arrival
                    </label>

                    <label className="flex gap-2">
                        <input type="checkbox" checked={tempFilter.discount} onChange={() => setTempFilter((p) => ({ ...p, discount: !p.discount }))} />
                        Discount
                    </label>
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <button
                        onClick={() => {
                            onApply(tempFilter);
                            onClose();
                        }}
                        className="w-full bg-black text-white py-3 rounded"
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>

    );
};

export default FilterMobile;
