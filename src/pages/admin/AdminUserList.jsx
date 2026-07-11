// AdminUserList.jsx
import React, { useEffect, useState } from "react";
import UserList from "@/components/admin/UserList";
import UserDetail from "@/components/admin/UserDetails";
import { getAllUsers, getUserTransactions } from "@/api/Api";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userlistPerPages = 6;

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetail = async (userId) => {
    try {
      const res = await getUserTransactions(userId);
      setSelectedUser(userId);
      setTransactions(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };
  const sortUserList = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const totalPages = Math.ceil(users.length / userlistPerPages);
  const indexOfLastProduct = currentPage * userlistPerPages;
  const indexOfFirstProduct = indexOfLastProduct - userlistPerPages;
  const currentUsers = sortUserList.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

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

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Customer</h2>
      <UserList users={currentUsers} onOpenModal={handleDetail} />
      <div className="flex justify-between items-center mt-4">
        <p className="text-xs text-gray-500">
          Showing {indexOfFirstProduct + 1} -{" "}
          {Math.min(indexOfLastProduct, users.length)} of {users.length} Cust
        </p>

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

      {isModalOpen && (
        <UserDetail
          userId={selectedUser}
          transactions={transactions}
          handleDetail={handleDetail}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminUserList;
