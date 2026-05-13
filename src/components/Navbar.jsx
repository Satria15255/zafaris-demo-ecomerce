import { FaBars, FaUserCircle } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar({ handleOpenCart, onToggleSidebar }) {
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart()
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
            className={`fixed top-0 z-20 md:px-4 py-2 h-20 w-full grid grid-cols-3 transition-all duration-500 ease-in-out
  ${scrolled ? " shadow-md rounded-b-xl bg-white" : "bg-white"}`}
        >
            <div className=" gap-7 hidden md:flex justify-start font-semibold text-md items-center">
                <p onClick={() => navigate("/")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
                    HOME
                </p>
                <p onClick={() => navigate("/products")} className="cursor-pointer hover:text-yellow-500 transition duration-100">
                    PRODUCTS
                </p>
                <p onClick={() => navigate("/products")} className="cursor-pointer  hover:text-yellow-500 transition duration-100">
                    CONTACT
                </p>
            </div>
            <div className="flex justify-center items-center">
                <p onClick={() => navigate("/")} className="font-semibold  font-sans text-sm md:text-xl lg:text-4xl ">
                    ZAFARIS<span className="text-yellow-500">.CO</span>
                </p>
            </div>
            <div className="flex justify-end gap-6 items-center">
                <button className="relative text-gray-700 hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
                    <MdOutlineFavoriteBorder size={30} />
                </button>
                <p onClick={handleOpenCart} className="relative px-2  hover:text-yellow-500 transition duration-100">
                    <MdOutlineShoppingCart size={30} />
                    {totalItems > 0 && (<span className="absolute top-2 right-4 bg-red-500 text-white bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full"><p>{totalItems}</p></span>)}
                </p>
                <button onClick={onToggleSidebar} className="relative  hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
                    <FaUserCircle size={30} />
                </button>
                {/* Hamburger icon */}
                <button className="relative md:hidden   px-2 hover:text-yellow-500 transition duration-100">
                    <FaBars />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
