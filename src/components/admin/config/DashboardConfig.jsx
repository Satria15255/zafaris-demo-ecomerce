import { GiCardboardBoxClosed, GiRunningShoe } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";

export const dashboardConfig = [
	{
		key: "totalStock",
		title: "Stock",
		icon: <GiCardboardBoxClosed />,
	},
	{
		key: "totalRevenue",
		title: "Revenue",
		icon: <IoLogoUsd />,
	},
	{
		key: "totalCompletedOrders",
		title: "Completed Orders",
		icon: <BsFillCartCheckFill />,
	},
	{
		key: "totalProductSold",
		title: "Product Sold",
		icon: <GiRunningShoe />,
	},
];
