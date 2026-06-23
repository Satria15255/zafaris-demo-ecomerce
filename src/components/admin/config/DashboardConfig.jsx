import { GiCardboardBoxClosed, GiRunningShoe } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";

export const dashboardConfig = [
	{
		key: "totalStock",
		title: "Total Stock",
		icon: <GiCardboardBoxClosed />,
	},
	{
		key: "totalRevenue",
		title: "Total Revenue",
		icon: <IoLogoUsd />,
	},
	{
		key: "totalCompletedOrders",
		title: "Total Completed Orders",
		icon: <BsFillCartCheckFill />,
	},
	{
		key: "totalProductSold",
		title: "Total Product Sold",
		icon: <GiRunningShoe />,
	},
];
