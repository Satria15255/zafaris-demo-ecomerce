import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";


const ProfilePages = () => {
    const { user } = useAuth()

    return (
        <div className="flex flex-col gap-8 h-full">
            <div className="flex justify-start items-center gap-2">
                <div className="text-7xl">
                    <FaUserCircle />
                </div>
                <div>
                    <h1 className="font-bold">{user.name}</h1>
                </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-2 gap-7 w-full">
                <div>
                    <h2>Username</h2>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h2>Email</h2>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h2>Phone</h2>
                    <p>{user.phoneNumber || "N/A"}</p>
                </div>
                <div>
                    <h2>Address</h2>
                    <p>{user.address || "N/A"}</p>
                </div>
            </div>

        </div>
    )
}

export default ProfilePages