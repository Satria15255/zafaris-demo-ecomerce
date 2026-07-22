import {
	BsArrowDownRightCircleFill,
	BsArrowUpRightCircleFill,
} from "react-icons/bs";

const DashboardStatsCard = ({ item, icon, title, data }) => {
	return (
		<div className="w-1/4 h-auto bg-white py-6 px-2 flex items-center justify-center gap-5 rounded-xl border border-gray-300 ">
			<div className=" h-full flex items-center">
				<p className="text-xl flex justify-center items-center p-3 text-[#F3E5AB] bg-gray-900 rounded-full">
					{icon}
				</p>
			</div>
			<div className="w-full flex flex-col">
				<p className="text-sm text-gray-600">{title}</p>
				<p className="text-xl font-bold">{data?.total}</p>
				{data?.trend === "up" ? (
					<p className="text-green-700 text-xs flex gap-1 items-center">
						<BsArrowUpRightCircleFill />+{data?.percentage}%
					</p>
				) : (
					<p className="text-red-700 text-xs flex gap-1 items-center">
						<BsArrowDownRightCircleFill />
						{data?.percentage}%
					</p>
				)}
			</div>
		</div>
	);
};

export default DashboardStatsCard;
