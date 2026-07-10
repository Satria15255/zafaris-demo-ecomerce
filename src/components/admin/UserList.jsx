import React from "react";
import { PiUserCircle } from "react-icons/pi";

const UserList = ({ handleDetail, onOpenModal, users }) => {
  console.log(users);
  return (
    <div className="p-4 w-full">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th>Customer Name</th>
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
