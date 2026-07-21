import { GiCardboardBoxClosed, GiRunningShoe } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdShoppingBag } from "react-icons/md";

export const dashboardConfig = [
	{
		key: "orders",
		title: "Stock",
		icon: <GiCardboardBoxClosed />,
	},
	{
		key: "products",
		title: "Products",
		icon: <GiRunningShoe />,
	},
	{
		key: "transaction",
		title: "Completed Orders",
		icon: <BsFillCartCheckFill />,
	},
	{
		key: "revenue",
		title: "Product Sold",
		icon: <MdShoppingBag />,
	},
];
