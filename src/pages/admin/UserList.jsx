// AdminUserList.jsx
import React, { useEffect, useState } from "react";
import UserList from "@/components/UserList";
import UserDetail from "@/components/UserDetail";
import { getAllUsers, getUserTransactions } from "@/api/Api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">User Terdaftar</h2>
      <UserList users={users} onOpenModal={handleDetail} />

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

export default UserList;
