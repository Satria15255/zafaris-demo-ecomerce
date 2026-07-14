import { GiCardboardBoxClosed, GiRunningShoe } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdShoppingBag } from "react-icons/md";

export const dashboardConfig = [
	{
		key: "totalAccounts",
		title: "Stock",
		icon: <GiCardboardBoxClosed />,
	},
	{
		key: "totalProducts",
		title: "Products",
		icon: <GiRunningShoe />,
	},
	{
		key: "totalCompletedOrders",
		title: "Completed Orders",
		icon: <BsFillCartCheckFill />,
	},
	{
		key: "totalProductSold",
		title: "Product Sold",
		icon: <MdShoppingBag />,
	},
];
