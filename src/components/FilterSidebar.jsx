import React from "react";
import { MdAutoAwesome, MdOutlineExpandMore, MdSell } from "react-icons/md";

const FilterSidebar = ({ categories, size, filter, setFilter }) => {
  return (
    <div>
      <div className="md:flex hidden flex-col md:w-full space-y-2 pr-3">
        <div className="">
          <button className="flex  md:text-sm lg:text-lg items-center justify-between rounded-xl w-full text-left py-2 text-lg rounded-md text-left font-semibold">
            Category
            <span>
              <MdOutlineExpandMore />
            </span>
          </button>
          <div className="py-2 flex md:flex-col pl-4 text-left space-y-2 ">
            {categories.map((cat) => (
              <p
                key={cat}
                value={cat}
                onClick={() => setFilter((prev) => ({ ...prev, category: cat }))}
                className={`flex items-center justify-start py-2 text-[9px] md:text-sm lg:text-lg text-left text-gray-500 font-semibold px-2 cursor-pointer rounded-xl transition-all transition-discrete duration-300 ease-in-out
                ${filter.category === cat ? "text-yellow-500 bg-gray-100 shadow-md" : "hover:text-yellow-500"}`}
              >
                - {cat}
              </p>
            ))}
          </div>
        </div>

        <div className="">
          <button className="flex items-center justify-between md:text-sm lg:text-lg rounded-xl w-full text-left py-2 flex justify-between items-center text-left font-semibold w-full ">
            Size{" "}
            <span>
              <MdOutlineExpandMore />
            </span>
          </button>
          <div className="pl-4 py-2 grid grid-cols-4 ">
            {size.map((size) => (
              <p
                key={size}
                value={size}
                onClick={() => setFilter((prev) => ({ ...prev, size: size }))}
                className={`flex items-center justify-center w-[6vh] h-[6vh] rounded-xl transition text-[9px] md:text-sm text-gray-500 font-bold cursor-pointer transition-all duration-300 ease-in-out
                ${filter.size === size ? "text-yellow-500 bg-gray-100 shadow-md" : "hover:text-yellow-500"}`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full">
          <button
            className={`flex items-center gap-1 md:text-sm lg:text-lg font-semibold rounded-xl w-full text-left py-2  hover:shadow-lg hover:pl-1 transition-all duration-300 ease-in-out
              ${filter.latest ? " border shadow-md pl-1" : "hover:text-yellow-500"}`}
            onClick={() => setFilter((prev) => ({ ...prev, latest: !prev.latest }))}
          >
            <span>
              <MdAutoAwesome />
            </span>
            New Arrival
          </button>
        </div>
        <div className="w-full">
          <button
            className={`flex items-center gap-1 md:text-sm lg:text-lg font-semibold rounded-xl w-full text-left py-2  hover:shadow-lg hover:pl-1 transition-all duration-300 ease-in-out
              ${filter.discount ? "border shadow-md pl-1" : "hover:text-yellow-500"}`}
            onClick={() => setFilter((prev) => ({ ...prev, discount: !prev.discount }))}
          >
            <span>
              <MdSell />
            </span>
            Discount Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
