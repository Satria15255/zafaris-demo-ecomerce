import DashboardStatsCard from "@/components/admin/DashboardStatsCard";
import { getDashboardStats, getSalesData } from "@/api/Api";
import React, { useState, useEffect } from "react";
import { dashboardConfig } from "@/components/admin/config/DashboardConfig";
import { MdOutlineCalendarMonth } from "react-icons/md";
import DatenTimeFormat from "@/components/shared/DatenTimeFormat";
import SalesChart from "@/components/admin/SalesChart";

const AdminDashboard = () => {
	const [stats, setStats] = useState({});
	const [salesData, setSalesData] = useState([]);
	const [range, setRange] = useState("7d");

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

	return (
		<div className="w-full">
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
			<main className="mt-4">
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
				<div>
					<div className="flex gap-2 mb-4">
						<button onClick={() => setRange("7d")}>7D</button>

						<button onClick={() => setRange("30d")}>30D</button>

						<button onClick={() => setRange("90d")}>90D</button>

						<button onClick={() => setRange("1y")}>1Y</button>
					</div>
					<SalesChart data={salesData} />
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
