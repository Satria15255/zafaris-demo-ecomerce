import DashboardStatsCard from "@/components/admin/DashboardStatsCard";
import {
	getDashboardStats,
	getSalesData,
	getAllTransactions,
	getAllProducts,
} from "@/api/Api";
import React, { useState, useEffect } from "react";
import { dashboardConfig } from "@/components/admin/config/DashboardConfig";
import { MdOutlineCalendarMonth } from "react-icons/md";
import DatenTimeFormat from "@/components/shared/DatenTimeFormat";
import SalesChart from "@/components/admin/SalesChart";
import LatestTransactionsTabel from "@/components/admin/dashboard/LatestTransactionsTabel";
import TopProductCard from "@/components/admin/dashboard/TopProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AdminDashboard = () => {
	const [stats, setStats] = useState({});
	const [salesData, setSalesData] = useState([]);
	const [range, setRange] = useState("7d");
	const [order, setOrder] = useState([]);
	const [products, setProducts] = useState([]);
	const ranges = [
		{
			label: "7D",
			value: "7d",
		},
		{
			label: "30D",
			value: "30d",
		},
		{
			label: "90D",
			value: "90d",
		},
		{
			label: "1Y",
			value: "1y",
		},
	];

	// Fetch Dashboard Stats
	const getDashboardItems = async () => {
		try {
			const res = await getDashboardStats();
			setStats(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDashboardItems();
	}, []);

	// Fetch sales data for chart
	const fetchSalesData = async () => {
		try {
			const res = await getSalesData(range);
			setSalesData(res.data);
			console.log("data sales:", salesData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchSalesData();
	}, [range]);

	// fetch last / newest transactions(order)
	const fetchOrders = async () => {
		const res = await getAllTransactions();
		setOrder(res.data);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	// Sort Order
	const sortOrders = [...order].sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
	);

	const lastOrders = sortOrders.slice(0, 5);

	// fetch top product
	const fetchProducts = async () => {
		try {
			const res = await getAllProducts();
			setProducts(res.data);
		} catch (err) {
			console.log("Failed to fetch best sellers:", err);
		}
	};
	const bestSellingProducts = products.filter(
		(product) => product.isBestSeller === true,
	);
	console.log("ini dari filter", bestSellingProducts);

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="w-full p-5">
			<header className="flex justify-between items-center border-b border-gray-300 py-4 px-2">
				<div>
					<h2>Good Morning !!</h2>
					<p>Here's what's happening in your store today</p>
				</div>
				<div className="flex items-center gap-3">
					<p className="p-2 text-3xl bg-gray-200 rounded-full">
						<MdOutlineCalendarMonth />
					</p>
					<h2>
						<DatenTimeFormat />
					</h2>
				</div>
			</header>
			<main className="mt-4 w-full">
				<div className="flex justify-around gap-4 px-2">
					{dashboardConfig.map((item) => (
						<DashboardStatsCard
							key={item.key}
							title={item.title}
							value={stats[item.key]}
							icon={item.icon}
						/>
					))}
				</div>

				{/*Sales Chart*/}
				<div className="mt-6">
					<div className="flex gap-3 justify-end mb-4">
						{ranges.map((item) => (
							<button
								key={item.value}
								onClick={() => setRange(item.value)}
								className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium
        ${
			range === item.value
				? "bg-black text-white shadow-md"
				: "bg-gray-200 hover:bg-gray-300 text-gray-700"
		}`}
							>
								{item.label}
							</button>
						))}
					</div>
					<SalesChart data={salesData} />
				</div>

				<div className="flex w-full gap-5">
					<div className="w-3/5">
						<LatestTransactionsTabel order={lastOrders} />
					</div>
					<div className="w-2/5 flex flex-col gap-5 bg-gray-100 rounded-3xl h-auto justify-center mt-2 lg:mt-4 p-5 shadow-lg">
						<div className="flex flex-col gap-5">
							<p className=" text-3xl">Congratulations!🎉</p>
							<p className="max-w-xs">
								Some of your products already have a highest
								buyer
							</p>
						</div>
						{/* Slider */}
						<Swiper
							modules={[Pagination, Autoplay]}
							slidesPerView={1}
							slidesPerGroup={1}
							autoplay={{ delay: 4000 }}
							pagination={{
								el: ".swiper-pagination",
								clickable: true,
							}}
							className="h-full w-full flex justify-center"
						>
							{bestSellingProducts.map((products, index) => (
								<SwiperSlide
									key={index}
									className="pb-2 w-full"
								>
									<TopProductCard
										key={products._id}
										product={products}
									/>
								</SwiperSlide>
							))}

							{/* Navigation & Pagination */}
							<div className="swiper-pagination"></div>
						</Swiper>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
