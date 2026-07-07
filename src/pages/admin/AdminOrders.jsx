import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersDetails from "@/components/admin/OrdersDetails";
import { toast } from "react-toastify";
import { getAllTransactions, updateTransactionStatus } from "@/api/Api";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

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

  return (
    <div className="w-full p-4">
      <header className="flex flex-col border border-gray-300 p-5">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-2 text-xs lg:text-sm bg-white border border-gray-300 rounded-xl"
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Start date"
            className="border border-gray-300 rounded-2xl w-1/4"
          />
        </div>
      </header>

      <OrdersTable order={sortOrders} onOpenModal={openModal} />

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
