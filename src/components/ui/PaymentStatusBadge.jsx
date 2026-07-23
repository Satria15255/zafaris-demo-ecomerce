import { TbCreditCardOff } from "react-icons/tb";
import { MdOutlineTimerOff, MdCreditScore } from "react-icons/md";
import {} from "react-icons/md";

const paymentConfig = {
	Unpaid: {
		color: "bg-red-100  text-red-700",
		icon: TbCreditCardOff,
	},
	Paid: {
		color: "bg-green-100 text-green-700",
		icon: MdCreditScore,
	},
	Expired: {
		color: "bg-gray-100  text-gray-700",
		icon: MdOutlineTimerOff,
	},
};

export default function PaymentStatusBadge({ status }) {
	const config = paymentConfig[status] || {
		color: "bg-gray-100 text-gray-700",
		icon: MdOutlineTimerOff,
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
