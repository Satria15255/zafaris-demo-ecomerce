import { useCallback, useEffect, useState } from "react";
import { getDiscountProducts } from "@/api/Api";
import { useNavigate } from "react-router-dom";
import discountImage from "@/assets/heroSection/discountSecs.webp";

function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function shuffleWithSeed(array, seed) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 1; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function OnSale({ onOpenModal }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const normalizeDiscount = (discount) => {
        return {
            ...discount.productId,
            isDiscount: true,
            discountPercent: discount.discountPercent,
            discountPrice: discount.discountPrice,
            expiresAt: discount.expiresAt,
        };
    };

    const fetchProducts = useCallback(async () => {
        try {
            const res = await getDiscountProducts();
            const normalized = res.data.map(normalizeDiscount);
            setProducts(normalized);
            console.log(normalized);
        } catch (err) {
            console.err("Failed to fetch products:", err);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const today = new Date();
    const seed = parseInt(today.toISOString().slice(0, 10).replace(/-/g, ""));

    const randomProduct = shuffleWithSeed(products, seed).slice(0, 1);
    console.log("discount product pages:", randomProduct);

    return (
        <div className=" mt-6 flex justify-center w-full h-auto">
            <div className="w-100 h-50 md:h-auto flex  bg-[#0C0C0C] ">
                <div className="w-2/5">
                    <img
                        src={discountImage}
                        alt="discountImage"
                        className="w-full h-50 md:h-80 object-cover object-center"
                    />
                </div>
                <div className="w-3/5 text-white flex p-4 flex-col justify-center gap-1 md:gap-3 font-montserrat">
                    <p className="text-[8px] md:text-sm">LIMITED OFFER</p>
                    <p className="text-lg md:text-6xl">
                        30% off every day for <br /> our dream products
                    </p>
                    <button className="py-1 lg:py-2 text-[7px] md:text-lg px-4 rounded-lg text-black w-1/3 md:w-1/5 bg-white border border-gray-300">
                        Get Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OnSale;
