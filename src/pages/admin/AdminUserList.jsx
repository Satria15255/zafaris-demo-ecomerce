// AdminUserList.jsx
import React, { useEffect, useState } from "react";
import UserList from "@/components/admin/UserList";
import UserDetail from "@/components/admin/UserDetails";
import { getAllUsers, getUserTransactions, getCustStats } from "@/api/Api";
import { FaUsers, FaUserCheck, FaHandHoldingUsd } from "react-icons/fa";
import { BsBagXFill } from "react-icons/bs";
import DashboardStatsCard from "@/components/admin/DashboardStatsCard";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [custStats, setCustStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userlistPerPages = 8;

  const userStats = [
    {
      title: "Registered Users",
      key: 16,
      icon: <FaUsers />,
    },
    {
      title: "Customers",
      key: 11,
      icon: <FaHandHoldingUsd />,
    },
    {
      title: "Never Purchased",
      key: 5,
      icon: <BsBagXFill />,
    },
    {
      title: "Active",
      key: 3,
      icon: <FaUserCheck />,
    },
  ];

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchCustomerStatisic = async (req, res) => {
    try {
      const res = await getCustStats();
      setCustStats(res.data);
      console.log(custStats);
    } catch (error) {
      console.log(eror);
    }
  };

  console.log(custStats);
  useEffect(() => {
    fetchCustomerStatisic();
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

  console.log(users);
  return (
    <div className="px-4 w-full flex flex-col gap-4 py-9">
      <header className="flex flex-col gap-2">
        <p className="text-4xl font-sans font-bold">Users Management</p>
        <p className="text-sm text-gray-700 font-sans">
          Manage every registered account inside Zafaris
        </p>
      </header>
      <div className="flex justify-around gap-4">
        {userStats.map((item) => (
          <DashboardStatsCard
            key={item.key}
            title={item.title}
            value={item.key}
            icon={item.icon}
          />
        ))}
      </div>
      <main>
        <div className="flex justify-around items-center gap-3 pb-3">
          <div className="w-full">
            <p className="text-sm text-gray-700">Dashboard / Users</p>
          </div>
          <div className="w-full">
            <select
              name=""
              id=""
              className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-full text-sm"
            >
              <option value="All User">All User</option>
              <option value="User Role">User Role</option>
              <option value="Admin Role">Admin Role</option>
              <option value="">Most Buy</option>
            </select>
          </div>
          <div className="w-full">
            <select
              name=""
              id=""
              className="bg-white py-2 px-2 rounded-xl border border-gray-300 w-full text-sm"
            >
              <option value="All User">All Status</option>
              <option value="User Role">Active</option>
              <option value="Admin Role">Inactive</option>
            </select>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search user name..."
              className="w-full px-2 py-2 text-xs lg:text-sm bg-white border border-gray-300 rounded-xl"
            />
          </div>
        </div>
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
      </main>

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
