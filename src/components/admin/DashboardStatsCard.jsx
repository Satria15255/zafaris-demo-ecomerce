const DashboardStatsCard = ({ item, icon, title, data }) => {
	console.log(data);
	const trend = data.trend === "up";
	const trendClass = ({ trend }) =>
		`text-xl text-gray-800 ${trend ? "text-green-600" : "text-red-500 text-xl"}`;

	return (
		<div className="w-1/4 h-auto bg-white py-6 px-2 flex items-center justify-center gap-5 rounded-xl border border-gray-300 ">
			<div className=" h-full flex items-center">
				<p className="text-xl flex justify-center items-center p-3 text-[#F3E5AB] bg-gray-900 rounded-full">
					{icon}
				</p>
			</div>
			<div className="w-full flex flex-col">
				<p className="text-sm">{title}</p>
				<p className="text-lg">{data?.total}</p>
				{data?.trend === "up" ? (
					<p className="text-green-300">+{data?.percentage}%</p>
				) : (
					<p className="text-red-300">{data?.percentage}%</p>
				)}
			</div>
		</div>
	);
};

export default DashboardStatsCard;
