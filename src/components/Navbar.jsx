import { FaBars } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { PiUserCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar({ handleOpenCart, onToggleSidebar }) {
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <div
            className={`fixed top-0 z-20  border-b border-gray-200 pb-5  md:px-4 py-4 h-auto w-full flex flex-col gap-4 transition-all duration-500 ease-in-out
  ${scrolled ? " shadow-md rounded-b-xl bg-white" : "bg-white"}`}
        >
            {/* Top Section */}
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <p onClick={() => navigate("/")} className="  font-sans text-sm md:text-xl lg:text-3xl ">
                        ZAFARIS<span className="text-yellow-500">.CO</span>
                    </p>
                </div>
                <div className="flex justify-center w-3/5">
                    <input type="text" placeholder="Search Products..." className="w-full px-2 h-[5vh] text-sm border border-gray-300 rounded-xl" />
                </div>
                <div className="flex justify-end gap-6 items-center">
                    {user ? (
                        <button onClick={onToggleSidebar} className="relative flex items-center gap-2 hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
                            <PiUserCircle size={30} /> <span>Hi {user.name}</span>
                        </button>
                    ) : (
                        <p onClick={() => navigate("/login")} className="cursor-pointer hover:underline mb-2 text-lg"> Login / Register</p>
                    )}
                    <button className="relative text-gray-700 hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
                        <MdOutlineFavoriteBorder size={30} />
                    </button>
                    <p onClick={handleOpenCart} className="relative px-2  hover:text-yellow-500 transition duration-100">
                        <MdOutlineShoppingCart size={30} />
                        {totalItems > 0 && (<span className="absolute top-2 right-4 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full"><p>{totalItems}</p></span>)}
                    </p>
                    {/* Hamburger icon */}
                    <button className="relative md:hidden   px-2 hover:text-yellow-500 transition duration-100">
                        <FaBars />
                    </button>
                </div>
            </div>
            {/* Bottom Section */}
            <div>
                <div className=" gap-7   hidden md:flex justify-start font-semibold text-md items-center">
                    <p onClick={() => navigate("/")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
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

        </div>
    );
}

export default Navbar;
