import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaUserPlus, FaCreditCard, FaSignOutAlt, FaUserCircle, FaSignInAlt, FaHome, FaBoxes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SidebarProfile = ({ closeSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth()

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
        <div className="inset-0 bg-black/10 fixed z-40 flex justify-end" onClick={closeSidebar}>
            <div className="mt-17 mr-10 rounded-3xl w-1/2 md:w-1/5 h-90 bg-white z-50 md:p-6 shadow-xl">
                <ul className="md:space-y-3">
                    {!user ? (
                        <>
                            <h2 className="text-[15px] text-center md:text-2xl font-bold py-3 border-b border-gray-500">
                                Zafaris<span className="text-yellow-500">.co</span>
                            </h2>
                            <button onClick={() => handleNavigate("/products")} className="flex items-center text-sm space-x-1 md:text-lg hover:text-gray-300 py-2 px-1 mt-1">
                                <FaBoxes />
                                <span>Product</span>
                            </button>
                            <button onClick={() => handleNavigate("/login")} className="flex items-center space-x-1 text-sm md:text-lg hover:text-gray-300 py-2 px-1 mt-1 ">
                                <FaSignInAlt />
                                <span>Login</span>
                            </button>
                            <button onClick={() => handleNavigate("/register")} className="flex items-center space-x-1 text-sm md:text-lg hover:text-gray-300 py-2 px-1 ">
                                <FaUserPlus />
                                <span>Register</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center items=center py-2">
                                <FaUserCircle size={50} />
                            </div>
                            <h2 className="text-[15px] text-center md:text-lg lg:text-2xl font-bold pb-3 border-b border-gray-500"> Hello {user.name}!</h2>
                            <button onClick={() => handleNavigate("/")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
                                <FaHome />
                                <span>Profile</span>
                            </button>
                            <button onClick={() => handleNavigate("/products")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
                                <MdOutlineFavoriteBorder />
                                <span>WishList</span>
                            </button>
                            <button onClick={() => handleNavigate("/orders")} className="flex font-bold items-center text-sm gap-2 hover:text-gray-300 py-2 px-1 mt-1">
                                <FaCreditCard />
                                <span>My Orders</span>
                            </button>
                            <button onClick={handleLogout} className="flex font-bold text-sm items-center gap-2 hover:text-red-400 py-2 px-1">
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SidebarProfile;
