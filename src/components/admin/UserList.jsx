import React from "react";

const UserList = ({ handleDetail, onOpenModal, users }) => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">User Terdaftar</h2>
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Login Pertama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user) => (
            <tr key={user._id} className="border-b py-6">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => onOpenModal(user._id)}
                  className="hover:bg-black hover:text-white border transition duration-300 px-3 py-1 rounded"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
