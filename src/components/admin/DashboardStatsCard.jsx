const DashboardStatsCard = ({ item, title, value }) => {
	return (
		<div className="w-1/4 h-auto py-4 flex items-center justify-center rounded-xl bg-gray-100 ">
			<h2>{title}</h2>
			<p>{value}</p>
		</div>
	);
};

export default DashboardStatsCard;
