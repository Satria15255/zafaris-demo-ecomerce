import React from "react";

const OrderDetails = ({ order, handleCancel, handleConfirm }) => {
  if (!Array.isArray(order) || order.length === 0) return <p>Belum ada order.</p>;

  return (
    <div className="p-2 pt-6 md:p-4 ">
      {order.map((ord) => (
        <div key={ord._id} className="border mb-6 p-2 h-auto md:p-4 rounded-xl shadow space-y-3">
          <p className="text-lg lg:text-sm font-semibold">Order Details:</p>
          <div className="flex flex-col md:flex-row h-full gap-4">
            {/* Product  */}
            <div className="w-full rounded-lg max-h-[40vh] overflow-y-auto bg-black p-5 mt-2 md:mt-4">
              {ord.products.map((item) => (
                <div key={item._id} className="flex justify-between items-center gap-4 mt-2">
                  <div className="flex justify-between gap-2 max-h-[30vh] items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex text-white flex-col">
                      <p className="text-md md:text-lg font-bold">{item.product.name}</p>
                      <div className="flex text-xs gap-2">
                        <p className="text-md lg:text-sm">Size: {item.size}</p>
                        <p className="text-md lg:text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] lg:text-lg font-bold text-yellow-500">${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Order Information */}
            <div className="w-full h-full flex flex-col gap-2 justify-around text-sm lg:text-sm">
              <p className="flex justify-between">
                <strong>Order Status:</strong>
                {ord.status}
              </p>
              <p className="flex justify-between">
                <strong>Total Product:</strong>
                {ord.totalProducts}
              </p>
              <p className="flex justify-between">
                <strong>Total Price:</strong>${ord.totalPrice.toFixed(2)}
              </p>
              <p className="flex h-auto justify-between">
                <strong>Address:</strong>
                {ord.shippingAddress}
              </p>
              <p className="flex justify-between">
                <strong>Shipping Method:</strong>
                {ord.shippingMethod}
              </p>
              <p className="flex justify-between">
                <strong>Payment Method: </strong>
                {ord.paymentMethod}
              </p>
              <p className="flex justify-between">
                <strong>Ordered on:</strong>
                {new Date(ord.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => handleCancel(ord._id)}
                  disabled={ord.status === "Completed" || ord.status === "Cancelled"}
                  className="text-sm md:text-md lg:text-lg border w-1/4 md:w-1/5 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
    disabled:hover:text-current"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Buttonn Clicked");
                    handleConfirm(ord._id);
                  }}
                  disabled={ord.status !== "Delivered"}
                  className="text-sm md:text-md lg:text-lg border w-1/4 md:w-1/5 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
    disabled:hover:text-current"
                >
                  Submitted
                </button>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
