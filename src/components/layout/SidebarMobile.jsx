import { useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";
import brandLogo1 from "@/assets/logo/brandLogo(1).webp";
import brandLogo2 from "@/assets/logo/brandLogo.webp";
import NavbarDropdown from "./NavbarDropdown";
import { IoMdClose } from "react-icons/io";

const SidebarMobile = ({ onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout Successfully");
        onClose();
    };

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };
    return (
        <div className="fixed bg-black/20 inset-0 flex justify-start">
            <div className="w-2/3 h-screen bg-white p-5 flex flex-col ">
                {/* Logos */}
                <div className="w-full flex justify-between pb-4">
                    <picture
                        onClick={() => handleNavigate("/")}
                        className=" w-40 lg:w-50 h-auto"
                    >
                        <source
                            media="(max-width: 640px)"
                            srcSet={brandLogo1}
                            className=""
                        />
                        <img
                            src={brandLogo2}
                            alt="Brand Logo"
                            width="862"
                            height="116"
                        />
                    </picture>
                    <button
                        aria-label="Open navigation menu"
                        onClick={onClose}
                        className="relative lg:hidden text-lg hover:text-yellow-500 transition duration-100"
                    >
                        <IoMdClose />
                    </button>
                </div>
                {/* User Validation */}
                <div>
                    {user && (
                        <div className="relative flex py-4 justify-start items-center gap-1 flex  hover:text-yellow-500 transition duration-100">
                            <PiUserCircle size={40} />{" "}
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Sidebar Menu */}
                <div className="">
                    <div className="flex flex-col  text-sm ">
                        <p
                            onClick={() => handleNavigate("/")}
                            className="cursor-pointer hover:text-yellow-500 transition duration-100 py-4 border-t border-gray-300"
                        >
                            HOME
                        </p>
                        <div className="text-sm border-gray-300">
                            <NavbarDropdown onClose={onClose} />
                        </div>
                        {!user ? (
                            <div className="text-sm">
                                <p
                                    onClick={() => handleNavigate("/login")}
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    LOGIN
                                </p>
                                <p
                                    onClick={() => handleNavigate("/register")}
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    REGISTER
                                </p>
                            </div>
                        ) : (
                            <>
                                <p
                                    onClick={() =>
                                        handleNavigate("/my-account")
                                    }
                                    className="cursor-pointer py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    MY ACCOUNT
                                </p>
                                <p
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-500 py-4 border-t border-gray-300 hover:text-yellow-500 transition duration-100"
                                >
                                    LOGOUT
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-1/3 bg-black-20 h-screen" onClick={onClose}></div>
        </div>
    );
};

export default SidebarMobile;
