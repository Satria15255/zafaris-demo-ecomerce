import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersDetails from "@/components/admin/OrdersDetails";
import { toast } from "react-toastify";
import { getAllTransactions, updateTransactionStatus } from "@/api/Api";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const sortOrders = [...order].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  console.log("order:", sortOrders);

  return (
    <div className="w-full p-4">
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
