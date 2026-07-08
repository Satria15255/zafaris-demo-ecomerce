import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersDetails from "@/components/admin/OrdersDetails";
import { toast } from "react-toastify";
import { getAllTransactions, updateTransactionStatus } from "@/api/Api";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPages = 6;

  const fetchOrders = async () => {
    const res = await getAllTransactions();
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateTransactionStatus(orderId, newStatus);
      setOrder((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };

  const filteredOrder = order.filter((order) =>
    order.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortOrders = [...filteredOrder].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const totalPages = Math.ceil(sortOrders.length / orderPerPages);
  const indexOfLastOrder = currentPage * orderPerPages;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPages;
  const currentOrder = sortOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const getPagination = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    // halaman 1-3
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, totalPages];
    }

    // halaman terakhir
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // halaman tengah
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  useEffect(() => {
    setCurrentPage;
  }, [search]);

  return (
    <div className="w-full flex flex-col gap-5 p-4 text-gray-700">
      <div className="flex justify-between px-2 font-semibold">
        <h2>Order History</h2>
        <p className="text-sm">
          <span className="text-black">Dashboard /</span> Order
        </p>
      </div>
      <header className="flex flex-col gap-4 rounded-lg border border-gray-300 p-5 text-xs">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-2 text-xs lg:text-sm bg-white border border-gray-300 rounded-xl"
          />
        </div>
        <div className="flex justify-around gap-5 items-center">
          <input
            type="date"
            placeholder="Start date"
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
          />
          <p>to</p>
          <input
            type="date"
            placeholder="End date"
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
          />
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
          >
            <option value="">All Status</option>
            <option value="">Pending</option>
            <option value="">Processing</option>
            <option value="">Shipped</option>
            <option value="">Delivered</option>
            <option value="">Completed</option>
            <option value="">Cancelled</option>
          </select>
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-xl py-2 px-2 w-1/4"
          >
            <option value="">All Method</option>
            <option value="">Cash on Delivery</option>
            <option value="">Visa</option>
            <option value="">Mastercard</option>
          </select>
        </div>
      </header>

      <div>
        <OrdersTable order={currentOrder} onOpenModal={openModal} />

        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">
            Showing {indexOfFirstOrder + 1} -{" "}
            {Math.min(indexOfLastOrder, sortOrders.length)} of{" "}
            {sortOrders.length} products
          </p>

          {/*Pagination button */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              ←
            </button>

            <div className="flex gap-2">
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={index}
                    className="w-10 h-10 flex items-center justify-center text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(item)}
                    className={`w-10 h-10 rounded-lg border border-gray-200 transition
        ${currentPage === item ? "bg-black text-white" : "hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === totalPages
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrdersDetails
          order={selectedOrder}
          onClose={closeModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminOrders;
