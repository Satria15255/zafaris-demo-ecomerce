import React from "react";

const orderDetails = ({ order, handleCancel, handleConfirm }) => {

  return (
    <div className="p-2 pt-6 ">
      <div key={order._id} className="border border-gray-300 mb-3 p-2 h-auto md:p-4 rounded-xl shadow space-y-3">
        <div className="flex flex-col  h-full gap-4">
          {/* Product  */}
          <p className="text-sm flex justify-between">
            <strong>Order Status:</strong>
            {order.status}
          </p>
          <div className="w-full rounded-lg bg-black p-5 ">
            {order.products.map((item) => (
              <div key={item._id} className="flex justify-between items-center gap-4 mt-2">
                <div className="flex gap-2 w-full lg:w-3/5 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex text-white flex-col">
                    <p className="text-xs md:text-lg font-bold">{item.product.name}</p>
                    <div>
                      <p className="md:hidden text-xs">{item.size} x {item.quantity}</p>
                    </div>
                    <div className="hidden md:flex flex text-xs gap-2">
                      <p className="text-md lg:text-sm">Size: {item.size}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex w-1/5 justify-start">
                  <p className="text-md text-white lg:text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="flex w-1/5 justify-end">
                  <p className="text-[12px] lg:text-lg font-bold text-yellow-500">${item.subtotal.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* order Information */}
          <div className="w-full h-full flex flex-col gap-2 justify-around text-sm lg:text-sm">

            <p className="flex justify-between">
              <strong>Total Product:</strong>
              {order.totalProducts}
            </p>
            <p className="flex justify-between">
              <strong>Total Price:</strong>${order.totalPrice.toFixed(2)}
            </p>
            <p className="flex h-auto justify-between">
              <strong>Address:</strong>
              {order.shippingAddress}
            </p>
            <p className="flex justify-between">
              <strong>Shipping Method:</strong>
              {order.shippingMethod}
            </p>
            <p className="flex justify-between">
              <strong>Payment Method: </strong>
              {order.paymentMethod}
            </p>
            <p className="flex justify-between">
              <strong>Order Time:</strong>
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-end gap-1">
              <button
                onClick={() => handleCancel(order._id)}
                disabled={order.status === "Completed" || order.status === "Cancelled"}
                className="text-xs md:text-md lg:text-lg border border-gray-300 w-1/4 md:w-1/5 px-1 py-1 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
    disabled:hover:text-current"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Buttonn Clicked");
                  handleConfirm(order._id);
                }}
                disabled={order.status !== "Delivered"}
                className="text-xs md:text-md lg:text-lg border border-gray-300 w-1/4 md:w-1/5 px-1 py-1 rounded-md font-semibold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
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
    </div>
  );
};

export default orderDetails;
