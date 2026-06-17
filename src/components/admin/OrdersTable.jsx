import React from "react";

const OrdersTable = ({ order, onOpenModal }) => {
  return (
    <div className="w-full border-collapse ">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100 w-full">
          <tr>
            <th className="p-2 w-1/3 text-left">Name</th>
            <th className="text-left">Total Products</th>
            <th className="text-left">Total Price</th>
            <th className="text-left">Order Status</th>
          </tr>
        </thead>
      </table>

      <div className="overflow-y-auto max-h-[75vh] w-full">
        <table className="w-full table-fixed">
          <tbody className="w-full">
            {order.map((o) => (
              <tr key={o._id} className="border-b w-full table-fixed ">
                <td className="p-2">{o.user.name}</td>
                <td className="p-2">{o.totalProducts}</td>
                <td className="p-2">${o.totalPrice}</td>
                <td className=" space-x-2">
                  <button
                    onClick={() => onOpenModal(o)}
                    className="text-gray-900 border border-black hover:bg-gray-900 hover:text-white transition duration-100 rounded-lg w-2/5 py-2"
                  >
                    Details
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

export default OrdersTable;
