import React from "react";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="flex flex-col bg-gray-900 justify-center h-auto ">
            <div className="grid grid-cols-1 md:place-items-center justify-center md:grid-cols-4 gap-4 px-2 md:px-7 py-6 md:py-12 ">
                <div className="flex flex-col  gap-2">
                    <p className="text-white font-bold text-lg md:text-lg lg:text-2xl ">
                        ZAFARIS
                        <span className="font-bold text-yellow-500">.CO</span>
                    </p>
                    <p className="text-[10px] w-1/2 md:w-full lg:text-xs text-white">
                        Zafaris.co is where style meets comfort in every step. We offer a curated selection of high-quality shoes with modern designs that reflect your unique character.
                        <span className="hidden md:flex">From casual looks to streetwear, every pair is crafted to support your active and confident lifestyle.</span>
                    </p>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Best Seller</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Latest Arrival</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">On Promo</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Product</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Product Category</p>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">How to Shop</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">FAQ</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Return Policy</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Terms of Service</p>
                    <p className="text-white text-xs  md:text-[10px] lg:text-sm">Privacy & Security</p>
                </div>
                <div className="flex justify-center space-x-2">
                    <div className="text-xs md:text-xl text-white">
                        <FaFacebookSquare />
                    </div>
                    <div className="text-xs md:text-xl text-white">
                        <FaInstagramSquare />
                    </div>
                    <div className="text-xs md:text-xl text-white">
                        <FaTwitterSquare />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-[6px] md:text-[8px] lg:text-xs text-white md:pb-3">Copyright© 2025 Zafaris.Co All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
