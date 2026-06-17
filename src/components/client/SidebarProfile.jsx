import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
    FaUserPlus,
    FaCreditCard,
    FaSignOutAlt,
    FaUserCircle,
    FaSignInAlt,
    FaHome,
    FaBoxes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const SidebarProfile = ({ closeSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleNavigate = (path) => {
        closeSidebar?.();
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout Successfully");
    };
    return (
        <div
            className="inset-0 bg-black/10 fixed z-40 flex justify-end"
            onClick={closeSidebar}
        >
            <div className="mt-17 mr-10 rounded-3xl w-1/2 md:w-50 lg:w-1/5 h-70 lg:h-90 bg-white z-50 md:p-6 shadow-xl">
                <ul className="md:space-y-3">
                    <div>
                        <div className="flex justify-center items=center py-2">
                            <FaUserCircle size={50} />
                        </div>
                        <h2 className="text-[15px] text-center md:text-sm lg:text-2xl font-bold pb-3 border-b border-gray-500">
                            {" "}
                            Hello {user.name}!
                        </h2>
                        <button
                            onClick={() =>
                                handleNavigate("/dashboard?tab=profile")
                            }
                            className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1"
                        >
                            <FaHome />
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={() =>
                                handleNavigate("/dashboard?tab=my-orders")
                            }
                            className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1"
                        >
                            <FaCreditCard />
                            <span>My Orders</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex font-bold text-sm items-center gap-2 hover:text-red-400 py-2 px-1"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default SidebarProfile;
