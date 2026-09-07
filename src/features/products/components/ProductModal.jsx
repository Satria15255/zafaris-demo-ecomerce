import { getProductById } from "@/features/products/services/productService";
import { useEffect, useState } from "react";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const ProductModal = ({ product, closeModal }) => {
	console.log(product);

	const [size, setSize] = useState([]);
	const [selectedSize, setSelectedSize] = useState(null);
	const { handleAddToCart } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	// PRODUCT STOCK INFORMATION
	const productSize = product?.variants?.map((stock) => stock.size);
	console.log(productSize);

	const currentVariant = product?.variants?.find(
		(v) => v.size === selectedSize,
	);
	console.log(currentVariant);

	// DISCOUNT VALIDATION
	const isDiscount = product.discountPercent > 0;

	// HANDLE CHECKOUT
	const handleChekoutNow = () => {
		try {
			if (!user) {
				navigate("/login");
				return;
			}
			if (!selectedSize) {
				toast.warning("Please select a size before adding to cart.");
				return;
			}
		} catch (error) {
			console.log(error);
		}

		const finalPrice =
			product.discountPercent > 0
				? product.price -
					(product.price * product.discountPercent) / 100
				: product.price;

		const selectedItem = {
			id: product._id,
			name: product.name,
			image: product.image,
			size: selectedSize,
			quantity: 1,
			finalPrice,
			discountPercent: product.discountPercent,
		};

		navigate("/checkout", { state: { checkoutItems: [selectedItem] } });
		closeModal();
	};
	console.log(product);
	return (
		<main className="bg-black/30 z-100 inset-0 fixed flex justify-center items-center">
			<section className="bg-white w-4/5 xl:w-2/5 h-auto rounded-2xl p-3">
				<div className="flex justify-end items-center h-2">
					<button
						onClick={closeModal}
						className="text-gray-500 hover:text-black transition duration-200"
					>
						<IoMdClose />
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2  px-2 pb-2">
					<div>
						<img
							src={product.image}
							alt={product?.name}
							className="rounded-xl"
						/>
					</div>
					<div className="flex flex-col justify-between md:px-2 font-ysabeau">
						<p className="text-3xl">{product.name}</p>
						<div className="flex items-center ">
							{isDiscount ? (
								<div className="flex gap-2">
									<p className="text-lg lg:text-2xl font-bold line-through">
										USD {product.price}.00
									</p>
									<p className="text-lg lg:text-2xl  font-bold">
										USD {product.discountPrice.toFixed(2)}
									</p>
								</div>
							) : (
								<div className="">
									<p className="text-lg lg:text-2xl font-bold">
										USD {product.price}.00
									</p>
								</div>
							)}
						</div>

						<section className="">
							<p className="text-lg lg:text-xl font-semibold">
								Size Charts
							</p>
							<div className="mt-3 lg:mt-6 flex flex-col gap-5">
								<div className="flex flex-wrap gap-3">
									{productSize?.length > 0 ? (
										productSize.map((size) => (
											<button
												key={size}
												type="button"
												onClick={() =>
													setSelectedSize(size)
												}
												className={`px-3 py-2 text-xs border border-gray-300 rounded-md transition 
                    ${
						selectedSize === size
							? "bg-black text-white border-gray-300"
							: "bg-white hover:bg-gray-100"
					}`}
											>
												{size}
											</button>
										))
									) : (
										<p className="text-gray-400 text-sm">
											Size not available
										</p>
									)}
								</div>

								{!selectedSize ? (
									<p className="text-red-500 text-sm mt-2">
										Please select a size
									</p>
								) : (
									<div>
										{currentVariant?.stock <= 3 ? (
											<p className="text-red-500 text-sm mt-2">
												<span>
													{currentVariant?.stock}
												</span>{" "}
												Stock Left
											</p>
										) : (
											<p className="mt-5 text-gray-500 text-sm font-semibold">
												<span>
													{currentVariant?.stock}
												</span>{" "}
												Stock Left
											</p>
										)}
									</div>
								)}
							</div>
							<div className=" flex gap-4 justify-arround text-sm">
								<button
									onClick={() =>
										handleAddToCart(product, selectedSize)
									}
									className="mt-2 flex gap-2 items-center justify-center w-full px-2 py-3 bg-white border border-gray-500 hover:text-white rounded-md hover:bg-black transition"
								>
									Add to Cart <FaCartPlus />
								</button>
								<button
									onClick={() => {
										handleChekoutNow();
										// closed();
									}}
									className="mt-2 flex gap-2 items-center justify-center w-full px-2 py-3 border border-gray-500 bg-black text-white hover:text-black rounded-md hover:bg-white transition"
								>
									Chekout <FaArrowRightLong />
								</button>
							</div>
						</section>
					</div>
				</div>
			</section>
		</main>
	);
};

export default ProductModal;
