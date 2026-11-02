import Hero from "@/pages/public/home/sections/Hero";
import CallAction from "@/pages/public/home/sections/CallAction";
import BestSeller from "@/pages/public/home/sections/BestSeller";
import DiscountSection from "@/pages/public/home/sections/Discount";
import NewArrival from "@/pages/public/home/sections/NewArrival";
import CategoryCollection from "@/pages/public/home/sections/CategorySection";
import Discover from "@/pages/public/home/sections/Discover";
import Subs from "@/pages/public/home/sections/Subs";

const HomePages = () => {
	return (
		<main className="flex flex-col items-center gap-5 overflow-hidden">
			<Hero />
			<CategoryCollection />
			<BestSeller />
			<DiscountSection />
			<NewArrival />
			<Discover />
			<Subs />{" "}
		</main>
	);
};

export default HomePages;
