import React from "react";
import { FaEdit } from "react-icons/fa";

const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="w-full border-collapse ">
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
                <td className="p-2 w-1/3 flex items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover mr-2 inline-block rounded-md"
                  />
                  <div>
                    <p>{p.name}</p>
                    <p className="text-xs text-gray-500">#{p._id}</p>
                  </div>
                </td>
                <td className="p-2">{p.brand}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className=" space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-gray-900 border border-gray-400 hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg p-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-gray-900 border border-black hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg w-2/5 py-2"
                  >
                    delet
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
