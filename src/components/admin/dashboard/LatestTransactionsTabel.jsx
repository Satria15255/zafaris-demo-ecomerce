import React from "react";

const LatestTransactionsTabel = ({ order, onOpenModal }) => {
  return (
    <div className="w-full border-collapse mt-4">
      <h2 className="pb-4">Latest Orders</h2>
      <table className="w-full table-fixed">
        <thead className="border-b border-gray-400 w-full py-2">
          <tr>
            <th className="text-left py-2">Order Id</th>
            <th className="text-left">Qty</th>
            <th className="text-left">Price</th>
            <th className="text-left">Date</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full py-5">
            {order.map((o) => (
              <tr
                key={o._id}
                className="border-b border-gray-200 w-full table-fixed "
              >
                <td className="py-6">{o._id.slice(-5)}</td>
                <td className="p-2">{o.totalProducts}</td>
                <td className="p-2">${o.totalPrice}</td>
                <td className="p-2">
                  {" "}
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestTransactionsTabel;
