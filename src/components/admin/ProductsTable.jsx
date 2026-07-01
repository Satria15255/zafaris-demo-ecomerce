import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="w-full border-collapse border border-gray-300">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 w-full">
          <tr>
            <th className="p-2 w-1/3 text-left">Name</th>
            <th className="text-left">Brand</th>
            <th className="text-left">Price</th>
            <th className="text-left">Category</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full">
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-300 w-full table-fixed "
              >
                <td className="p-2  w-1/3">
                  <div className="flex">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover mr-2 inline-block rounded-md"
                    />
                    <p className="p-2 flex flex-col">
                      {p.name}
                      <span className="text-xs text-gray-400">#{p._id}</span>
                    </p>
                  </div>
                </td>

                <td className="p-2">{p.brand}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-gray-900 border border-black hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
