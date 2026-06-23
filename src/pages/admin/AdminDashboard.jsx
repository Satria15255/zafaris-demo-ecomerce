import DashboardStatsCard from "@/components/admin/DashboardStatsCard";
import { getDashboardStats } from "@/api/Api";
import React, { useState, useEffect } from "react";
import { dashboardConfig } from "@/components/admin/config/DashboardConfig";

const AdminDashboard = () => {
	const [stats, setStats] = useState({});

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
	return (
		<div className="w-full">
			<header className="flex justify-between items-center border-b border-gray-300 py-4 px-2">
				<div>
					<h2>Good Morning !!</h2>
					<p>Here's what's happening in your store today</p>
				</div>
				<div>
					<h2>22, June 2026</h2>
				</div>
			</header>
			<main className="mt-4">
				<div className="flex justify-between px-2">
					{dashboardConfig.map((item) => (
						<DashboardStatsCard
							key={item.key}
							title={item.title}
							value={stats[item.key]}
						/>
					))}
				</div>
				<div>
					<h1>Chart nanti disini</h1>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
