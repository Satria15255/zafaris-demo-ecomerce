import { FaBars, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 z-20 md:px-4 py-2 h-20 w-full grid grid-cols-3 transition-all duration-500 ease-in-out
  ${scrolled ? " shadow-md rounded-b-xl bg-white" : "bg-white"}`}
        >
            <div className=" gap-4 hidden md:flex justify-start items-center">
                <p onClick={() => navigate("/")} className="cursor-pointer text-lg hover:text-yellow-500 transition duration-100">
                    HOME
                </p>
                <p onClick={() => navigate("/products")} className="cursor-pointer text-lg hover:text-yellow-500 transition duration-100">
                    PRODUCTS
                </p>
                <p onClick={() => navigate("/products")} className="cursor-pointer text-lg hover:text-yellow-500 transition duration-100">
                    BLOG
                </p>
            </div>
            <div className="flex justify-center items-center">
                <p onClick={() => navigate("/")} className="font-bold italic font-sans text-sm md:text-xl lg:text-4xl ">
                    ZAFARIS<span className="text-yellow-500">.CO</span>
                </p>
            </div>
            <div className="flex justify-end items-center">
                <p onClick={() => navigate("/cart")} className="relative px-2  hover:text-yellow-500 transition duration-100">
                    <FaShoppingBag size={30} />
                    {/* {cartCount > 0 && <span className="absolute top-2 right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>} */}
                </p>
                <button className="relative  hidden md:flex px-2 hover:text-yellow-500 transition duration-100">
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
