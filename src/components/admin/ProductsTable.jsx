import React from "react";

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
              <tr key={p._id} className="border-b w-full table-fixed ">
                <td className="p-2 w-1/3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover mr-2 inline-block rounded-md"
                  />
                  {p.name}
                </td>
                <td className="p-2">{p.brand}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className=" space-x-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-gray-900 border border-black hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg w-2/5 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-gray-900 border border-black hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg w-2/5 py-2"
                  >
                    Delete
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
