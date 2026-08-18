import React, { useState, useMemo } from "react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { TbBasketQuestion } from "react-icons/tb";
import { FaMinus } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getDiscountVoucher } from "@/api/Api";

const ShoppingCart = () => {
	const {
		cart,
		removeCartItems,
		updateQty,
		totalPrice,
		voucher,
		applyVoucher,
		removeVoucher,
		voucherLoading,
		voucherError,
		finalTotal,
	} = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [voucherCode, setVoucherCode] = useState("");

	// Handle perubahan input form
	const handleChange = (e) => {
		setVoucherCode((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleVoucher = async () => {
		try {
			await applyVoucher(voucherCode);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="h-auto md:mt-16 md:pt-16 py-4 flex flex-col justify-center items-center justify-center">
			<header className="text-center py-10">
				<p className="text-4xl font-montserrat">Your Shopping Cart</p>
			</header>
			<main className="w-full flex flex-col md:flex-row  max-w-7xl px-4 gap-5">
				<aside className="w-full  md:w-1/2 lg:w-3/5">
					<div className="py-2">
						<p className="font-semibold text-lg font-montserrat">
							{" "}
							Cart Items
						</p>
					</div>
					<div className=" ">
						{cart.length === 0 ? (
							<div className="flex flex-col justify-center items-center gap-4 space-y-4">
								<p className="text-gray-300 text-8xl">
									<TbBasketQuestion />
								</p>
								<p className="text-center  text-2xl font-semibold font-ysabeau">
									Your cart is empty
								</p>
								<p className="text-sm text-gray-700 font-montserrat max-w-xs text-center ">
									You may check out all the available products
									and buy some in the shop
								</p>
								<button
									onClick={() => navigate("/products")}
									className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg"
								>
									Continue Shopping
								</button>
							</div>
						) : (
							<table className="w-full">
								<thead className="hidden lg:table-header-group border-t border-gray-400 h-4 ">
									<tr className="my-3 text-gray-400 font-semibold text-sm">
										<td className="py-6">PRODUCTS</td>
										<td>QUANTITY</td>
										<td>TOTAL</td>
									</tr>
								</thead>
								<tbody className="border-t border-gray-400 table-fixed max-h-60 overflow-y-auto">
									{cart.map((item) => {
										return (
											<>
												<tr
													key={`${item.productId._id} - ${item.size}`}
													className="border-b border-gray-300 table-fixed  "
												>
													{/* Produk */}
													<td className="flex justify-between  items-center py-2">
														<img
															src={
																item.productId
																	.image
															}
															alt={
																item.productId
																	.name
															}
															className="w-25 h-25 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded mr-1 md:mr-4"
														/>

														<div className="flex flex-col justify-between gap-2  w-full h-full">
															<div>
																<p className="text-sm lg::text-lg max-w-sm font-medium">
																	{
																		item
																			.productId
																			.name
																	}
																</p>
															</div>
															<div className="flex items-center gap-8">
																<p className="text-xs lg:text-sm text-gray-600 font-semibold">
																	Size:{" "}
																	{item.size}
																</p>
																<div className="flex gap-2 items-center">
																	{item.discountPercent >
																		0 && (
																		<div className="flex gap-2">
																			<p className="text-sm">
																				$
																				{
																					item.discountPercent
																				}
																				OFF
																			</p>
																			<p className="text-sm line-through">
																				$
																				{
																					item.price
																				}
																				.00{" "}
																			</p>
																		</div>
																	)}
																	<p className="text-yellow-500 text-sm text-lg font-semibold">
																		$
																		{
																			item.finalPrice
																		}
																		.00
																	</p>
																</div>
															</div>
															<div className="flex justify-start">
																<button
																	onClick={() =>
																		removeCartItems(
																			item
																				.productId
																				._id,
																			item.size,
																		)
																	}
																	className="text-xs md:text-sm text-gray-500 hover:text-red-500 md:mt-1"
																>
																	Remove
																</button>
															</div>
														</div>
													</td>
													<td>
														<div className="flex justify-between ">
															<div className="flex items-center justify-center rounded-sm border py-1 border-gray-200">
																<button
																	className="text-xs lg:text-sm xl:text-lg text-gray-400 hover:text-[#0C0C0C] transition duration-100 px-2 py-1   rounded"
																	onClick={() =>
																		updateQty(
																			item
																				.productId
																				._id,
																			item.size,
																			item.quantity -
																				1,
																		)
																	}
																>
																	<LuMinus />
																</button>
																<span className="text-xs lg:text-sm px-2 md:px-4">
																	{
																		item.quantity
																	}
																</span>
																<button
																	className="text-xs lg:text-sm px-2 text-gray-400 hover:text-[#0C0C0C] transition duration-100 py-1   rounded"
																	onClick={() =>
																		updateQty(
																			item
																				.productId
																				._id,
																			item.size,
																			item.quantity +
																				1,
																		)
																	}
																>
																	<LuPlus />
																</button>
															</div>
														</div>
													</td>
													<td>
														<div className="flex items-center text-lg justify-center text-left text-yellow-500 font-semibold  hidden lg:block">
															$
															{item.finalPrice *
																item.quantity}
															.00
														</div>
													</td>
												</tr>
												<div className="w-40 py-4">
													<p className="text-sm  cursor-pointer lg:text-lg w-full  text-gray-600 hover:text-[#0C0C0C] transition duration-200 font-ysabeau border-b border-gray-400 pb-1">
														Continue Shopping
													</p>
												</div>
											</>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				</aside>
				<aside className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-8">
					{/*Voucher Aplly*/}
					<div>
						<div className="py-2">
							<p className="font-semibold text-lg font-montserrat">
								{" "}
								Voucher
							</p>
						</div>
						<div className=" border bg-gray-100 border-gray-100 text-md w-full h-auto p-3 rounded-xl">
							<form className="flex gap-3 items-center py-2 ">
								<input
									type="text"
									placeholder="Our Voucher Code"
									onChange={handleChange}
									className="bg-white w-full px-2 py-2 font-ysabeau rounded-xl border border-gray-300"
								/>
								<button
									onClick={handleVoucher}
									className=" flex justify-center font-ysabeau items-center text-sm  w-1/5 py-2 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] hover:border border-gray-400 transition duration-200   rounded-xl"
								>
									Apply
								</button>
							</form>
						</div>
					</div>
					{/*Cart Info*/}
					<div>
						<div className="py-2">
							<p className="font-semibold text-lg font-montserrat">
								{" "}
								Details
							</p>
						</div>
						<div className=" border bg-gray-100 border-gray-100 text-md w-full h-auto p-3 rounded-xl">
							<div className="flex justify-between py-2 border-b border-gray-300 font-semibold">
								<p>Sub Total (1 Product)</p>
								<p className="text-yellow-500">
									{" "}
									${totalPrice.toFixed(2)}
								</p>
							</div>
							<div className="py-2">
								<p className="font-semibold">Total Savings</p>
								<p className="flex justify-between text-gray-500">
									1 voucher has been used <span>-$3.00</span>
								</p>
							</div>
							<div className="py-2">
								<p className="font-semibold">Delivery</p>
								<p className="flex justify-between text-gray-500">
									From ZAFARIS indonesia{" "}
									<span>Calculated at checkout</span>
								</p>
							</div>
							<div className="flex justify-between py-2 border-b border-gray-300 font-semibold">
								<p>Service Tax</p>
								<p> $1.00</p>
							</div>
							<div className="flex justify-between py-2 font-semibold">
								<p>Total</p>
								<p className="text-yellow-500">
									${totalPrice.toFixed(2)}
								</p>
							</div>
							<div>
								<button
									onClick={() => {
										navigate("/checkout", {
											state: {
												checkoutItems: cart.map(
													(item) => ({
														id: item.productId._id,
														name: item.productId
															.name,
														image: item.productId
															.image,
														size: item.size,
														quantity: item.quantity,
														finalPrice:
															item.finalPrice,
														discountPercent:
															item.discountPercent,
													}),
												),
											},
										});

										closeShoppingCart();
									}}
									className="text-lg flex justify-center font-ysabeau items-center  w-full h-12 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] hover:border border-gray-400 transition duration-200 text-white rounded-xl"
								>
									Check Out
								</button>
							</div>
						</div>
					</div>
				</aside>
			</main>
		</div>
	);
};

export default ShoppingCart;
