const DashboardStatsCard = ({ item, icon, title, value }) => {
	return (
		<div className="w-1/4 h-auto py-3 px-2 flex items-center justify-center gap-5 rounded-xl bg-gray-100">
			<div className=" h-full flex items-center">
				<p className="text-xl flex justify-center items-center p-3 bg-white text-gray-900 rounded-full">
					{icon}
				</p>
			</div>
			<div className="w-full flex flex-col">
				<p className="text-sm">{title}</p>
				<p className="text-lg">{value}</p>
			</div>
		</div>
	);
};

export default DashboardStatsCard;
