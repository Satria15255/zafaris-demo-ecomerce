import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { TbBasketQuestion } from "react-icons/tb";
import { FaMinus } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";

const ShoppingCart = () => {
	const { cart, removeCartItems, updateQty, totalPrice } = useCart();
	const { user } = useAuth();
	return (
		<div className="h-auto mt-16 pt-16 py-4 flex flex-col justify-center items-center justify-center">
			<header className="text-center py-8">
				<h1>Your Shopping Cart</h1>
			</header>
			<main className="w-full flex max-w-7xl gap-5">
				<aside className="w-3/5">
					<div className="w-full">
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
								<button className="px-4 py-2 border border-gray-200 bg-[#0C0C0C] text-white hover:bg-white hover:text-[#0C0C0C] transition duration-200 font-semibold rounded-lg">
									Continue Shopping
								</button>
							</div>
						) : (
							<table className="w-full">
								<thead className="border-t border-gray-400 h-4 ">
									<tr className="my-3 text-gray-400 font-semibold text-sm">
										<td className="py-6">PRODUCTS</td>
										<td>QUANTITY</td>
										<td>TOTAL</td>
									</tr>
								</thead>
								<tbody className="border-t border-gray-400 table-fixed max-h-60 overflow-y-auto">
									{cart.map((item) => {
										return (
											<tr
												key={`${item.productId._id} - ${item.size}`}
												className="border-b border-gray-300 table-fixed  "
											>
												{/* Produk */}
												<td className="flex justify-between  items-center py-2">
													<img
														src={
															item.productId.image
														}
														alt={
															item.productId.name
														}
														className="w-25 h-25 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded mr-1 md:mr-4"
													/>

													<div className="flex flex-col justify-between gap-2  w-full h-full">
														<div>
															<p className="text-sm md:text-lg text-sm max-w-sm font-medium">
																{
																	item
																		.productId
																		.name
																}
															</p>
														</div>
														<div className="flex gap-8">
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
														<div className="flex items-center justify-center rounded-sm border border-gray-200">
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
																{item.quantity}
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
													<div className="flex items-center text-lg justify-center text-left text-yellow-500 font-semibold  hidden md:block">
														$
														{item.finalPrice *
															item.quantity}
														.00
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
					<div className="w-full py-4">
						<p className="text-sm lg:text-lg w-1/5 text-gray-600 hover:text-[#0C0C0C] transition duration-200 font-ysabeau border-b pb-1">
							Continue Shopping
						</p>
					</div>
				</aside>
				<aside className="w-2/5">
					{/*Cart Info*/}
					<div className="bg-[#0C0C0C] w-full h-80"></div>
				</aside>
			</main>
		</div>
	);
};

export default ShoppingCart;
