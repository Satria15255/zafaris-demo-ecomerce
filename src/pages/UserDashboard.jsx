import { useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { PiUserCircle } from "react-icons/pi";
import { FaCreditCard, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import MyOrdersPage from "./MyOrderPages"
import ProfilePage from "./ProfilePages"

const UserDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { logout, user } = useAuth()

    const tab = searchParams.get("tab") || "profile"

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout Successfully");
    };

    return (
        <div className="flex min-h-screen pt-16 mt-13">
            {/* Sidebar */}
            <div className=" w-1/4 flex flex-col items-start p-3 gap-3 ">
                <div className="pb-5 border-b w-full">
                    <p className="text-lg">Hello</p>
                </div>
                <button className={`w-4/5 rounded-3xl text-left flex justify-between items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "profile" ? "bg-black text-white" : ""}`} onClick={() => setSearchParams({ tab: "profile" })}>Profile<FaUserCircle size={20} /></button>
                <button className={`w-4/5 rounded-3xl text-left flex justify-between items-center p-3 hover:bg-black hover:text-white transition duration-200 ${tab === "my-orders" ? "bg-black text-white" : ""}`} onClick={() => setSearchParams({ tab: "my-orders" })}>My Orders<FaCreditCard size={20} /></button>
                <button className={`w-4/5 rounded-3xl text-left flex justify-between items-center p-3 hover:bg-black hover:text-white transition duration-200`} onClick={handleLogout}>
                    Logout<FaSignOutAlt size={20} />
                </button>
            </div>
            {/* Main Content */}
            <div className="ml-auto w-3/4 p-5">
                {tab === "profile" && <ProfilePage />}
                {tab === "my-orders" && <MyOrdersPage />}
            </div>
        </div>
    )
}

export default UserDashboard