export const getGreeting = () => {
	const now = new Date();

	const hour = now.getHours();
	const day = now.getDay(); // 0 = Sunday, 6 = Saturday

	// Weekend
	if (day === 0 || day === 6) {
		return "Happy Weekend";
	}

	//Weekday
	if (hour >= 4 && hour <= 12) {
		return "Good Morning";
	}

	if (hour >= 12 && hour <= 17) {
		return "Good Afternoon";
	}

	if (hour >= 17 && hour <= 21) {
		return "Good Evening";
	}

	return "Good Night";
};

export const isWeekend = () => {
	const day = new Date().getDay();
	return day === 0 || day === 6;
};
