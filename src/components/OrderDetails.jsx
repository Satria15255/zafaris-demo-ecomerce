import React from "react";

const orderDetails = ({ order, handleCancel, handleConfirm }) => {

  return (
    <div className="p-2 pt-6 ">
      <div key={order._id} className="border border-gray-300 mb-3 p-2 h-auto md:p-4 rounded-xl shadow space-y-3">
          <div className="flex flex-col md:flex-row h-full gap-4">
            {/* Product  */}
          <div className="w-full rounded-lg max-h-[40vh] overflow-y-auto bg-black p-5 ">
            {order.products.map((item) => (
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

          {/* order Information */}
            <div className="w-full h-full flex flex-col gap-2 justify-around text-sm lg:text-sm">
              <p className="flex justify-between">
                <strong>Order Status:</strong>
              {order.status}
              </p>
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
              <strong>ordered on:</strong>
              {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end gap-1">
                <button
                onClick={() => handleCancel(order._id)}
                disabled={order.status === "Completed" || order.status === "Cancelled"}
                  className="text-sm md:text-md lg:text-lg border w-1/4 md:w-2/5 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
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
                  className="text-sm md:text-md lg:text-lg border w-1/4 md:w-2/5 py-1 rounded-md font-bold hover:bg-gray-900 hover:text-white transition duration-300 disabled:opacity-50 
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
