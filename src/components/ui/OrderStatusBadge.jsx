import { PiClockCountdown } from "react-icons/pi";
import { TbRotateClockwise2, TbTruckDelivery } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdTimerOff } from "react-icons/md";

const orderStatusConfig = {
	Processing: {
		color: "bg-blue-100  text-blue-700",
		icon: TbRotateClockwise2,
	},
	Shipped: {
		color: "bg-indigo-100 text-indigo-700",
		icon: TbTruckDelivery,
	},
	Delivered: {
		color: "bg-green-100 text-green-700",
		icon: TbTruckDelivery,
	},
	Completed: {
		color: "bg-green-100 text-green-700",
		icon: FaCheckCircle,
	},
	Cancelled: {
		color: "bg-red-100 text-red-700",
		icon: MdCancel,
	},
	Expired: {
		color: "bg-gray-100 text-gray-700",
		icon: MdTimerOff,
	},
};

export default function OrderStatusBadge({ status }) {
	const config = orderStatusConfig[status] || {
		color: "bg-gray-100 text-gray-600",
		icon: PiClockCountdown,
	};

	const Icon = config.icon;

	return (
		<span
			className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
		>
			<Icon size={14} />
			{status}
		</span>
	);
}
