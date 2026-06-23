import { useState, useEffect } from "react";

const RealTimeDate = () => {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const day = dateTime.toLocaleDateString(undefined, {
		weekday: "long",
	});

	const date = dateTime.toLocaleDateString(undefined, {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const time = dateTime.toLocaleDateString();

	return (
		<div className="flex flex-col">
			<p className="text-sm">
				{day}, {date}
			</p>
			<p className="text-sm">{time}</p>
		</div>
	);
};

export default RealTimeDate;
