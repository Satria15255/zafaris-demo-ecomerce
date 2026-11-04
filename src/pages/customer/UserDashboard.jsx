import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PiUserCircle } from "react-icons/pi";
import {
    FaShoppingBag,
    FaSignOutAlt,
    FaUserCircle,
    FaLockOpen,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import MyOrdersPage from "./MyOrderPages";
import ProfilePage from "./ProfilePages";
import AddressPage from "./AddressPages";
import ChangePassword from "./ChangePassword";

const UserDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const tab = searchParams.get("tab") || "profile";

    const handleLogout = () => {
        logout();
        toast.success("Logout Successfully");
    };

    return (
        <main className="flex justify-center bg-[#FAFAFA] w-full">
            <div className="flex w-full xl:max-w-4/5 lg:min-h-screen pt-16 mt-10 lg:mt-16">
                {/* Sidebar */}
                <aside className="hidden w-1/4 md:flex flex-col space-y-2 pt-8 px-3 border-r border-gray-300">
                    <button
                        className={`w-full rounded-lg text-left flex gap-3   items-center p-3 hover:bg-gray-200  transition duration-200 ${tab === "profile" ? "bg-gray-200 " : ""}`}
                        onClick={() => setSearchParams({ tab: "profile" })}
                    >
                        <FaUserCircle size={20} />
                        Profile
                    </button>
                    <button
                        className={`w-full  rounded-lg text-left flex gap-3   items-center p-3 hover:bg-gray-200 transition duration-200 ${tab === "my-orders" ? "bg-gray-200" : ""}`}
                        onClick={() => setSearchParams({ tab: "my-orders" })}
                    >
                        <FaShoppingBag size={20} />
                        My Orders
                    </button>
                    <button
                        className={`w-full rounded-lg text-left flex gap-3   items-center p-3 hover:bg-gray-200 transition duration-200 ${tab === "addresses" ? "bg-gray-200" : ""}`}
                        onClick={() => setSearchParams({ tab: "addresses" })}
                    >
                        <FaMapLocationDot size={20} />
                        My Address
                    </button>
                    <button
                        className={`w-full rounded-lg text-left flex gap-3   items-center p-3 hover:bg-gray-200 transition duration-200 ${tab === "change-password" ? "bg-gray-200" : ""}`}
                        onClick={() =>
                            setSearchParams({ tab: "change-password" })
                        }
                    >
                        <FaLockOpen size={20} />
                        Change Password
                    </button>
                    <button
                        className={`w-full rounded-lg text-left flex gap-3 items-center p-3 hover:bg-red-500 hover:text-white transition duration-200`}
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt size={20} /> Logout
                    </button>
                </aside>
                {/* Main Content */}
                <section className="ml-auto pt-3 w-full min-h-screen bg-[#FAFAFA]">
                    {tab === "profile" && <ProfilePage />}
                    {tab === "my-orders" && <MyOrdersPage />}
                    {tab === "addresses" && <AddressPage />}
                    {tab === "change-password" && <ChangePassword />}
                </section>
            </div>
        </main>
    );
};

export default UserDashboard;
