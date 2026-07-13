import React from "react";
import { PiUserCircle } from "react-icons/pi";

const UserList = ({ handleDetail, onOpenModal, users }) => {
  console.log(users);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">User Terdaftar</h2>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Orders</th>
            <th>Registered</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-300 py-8">
              <td className="flex items-center gap-2  my-3 ">
                <div>
                  <PiUserCircle size={40} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </td>
              <td>
                {user.address?.length > 0 &&
                user.address[0].country &&
                user.address[0].city
                  ? `${user.address[0].country}, ${user.address[0].city}`
                  : "Unknown"}
              </td>{" "}
              <td>{user?.totalOrders || 0}</td>
              <td className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
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
