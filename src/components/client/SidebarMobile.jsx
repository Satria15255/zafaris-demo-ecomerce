import { useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { useAuth } from "../context/AuthContext"
import brandLogo from "../assets/logo/brandLogo.png";

const SidebarMobile = ({ onClose }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout Successfully");
    };
    return (
        <div onClick={onClose} className="fixed bg-black/20 inset-0 flex justify-start">
            <div className="w-1/2 h-screen bg-white p-5 flex flex-col ">
                {/* Logos */}
                <div onClick={() => navigate("/")} className="cursor-pointer mb-6">
                    <img src={brandLogo} className="w-40 h-auto" />
                </div>
                {/* User Validation */}
                <div>
                    {user ? (
                        <p className="relative flex flex-col items-center gap-2 flex px-2 hover:text-yellow-500 transition duration-100">
                            <PiUserCircle size={40} /> <span className="text-left">{user.name}</span>
                        </p>
                    ) : (
                            <div className="text-sm">
                                <p onClick={() => navigate("/login")} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">
                                    Login
                                </p>
                                <p onClick={() => navigate("/register")} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">Register</p>
                            </div>
                    )}
                </div>
                {/* Sidebar Menu */}
                <div className="">
                    <div className="flex flex-col font-semibold text-sm ">
                        {user && (
                            <>
                                <p onClick={() => navigate("/dashboard?tab=profile")} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">
                                    PROFILE
                                </p>
                                <p onClick={() => navigate("/dashboard?tab=my-orders")} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">
                                    MY ORDERS
                                </p>

                            </>
                        )}
                        <div className="text-sm py-4 border-t border-gray-300">
                            <p className="cursor-pointer hover:text-yellow-500 transition duration-100">CATEGORY :</p>
                            <div className="pl-2 flex flex-col gap-4 mt-4">
                                <p onClick={() => navigate("/products")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
                                    RUNNING
                                </p>
                                <p onClick={() => navigate("/products")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
                                    BASKETBALL
                                </p>
                                <p onClick={() => navigate("/products")} className="cursor-pointer  hover:text-yellow-500 transition duration-100">
                                    SNEAKERS
                                </p>
                                <p onClick={() => navigate("/products")} className="cursor-pointer  hover:text-yellow-500 transition duration-100">
                                    CASUAL
                                </p>
                                <p onClick={() => navigate("/products")} className="cursor-pointer  hover:text-yellow-500 transition duration-100">
                                    FOOTBALL
                                </p>
                            </div>
                        </div>
                        {user && (
                            <>
                                <p onClick={() => navigate("/dashboard?tab=change-password")} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">
                                    SETTINGS
                                </p>
                                <p onClick={handleLogout} className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100">LOGOUT</p>
                            </>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarMobile