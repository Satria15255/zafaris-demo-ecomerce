import runningImage from "@/assets/heroSection/discountImage.webp";
import discountImage from "@/assets/heroSection/dicountmaget.webp";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Item = [
	{
		id: 1,
		label: "30% OFF",
		title: "Explore the Running Collection",
		navigation: "/products?category=Running",
		img: `${runningImage}`,
	},
	{
		id: 2,
		label: "30% OFF",
		title: "Check out Today's Discounted Products",
		navigation: "/products?category=Running",
		img: `${discountImage}`,
	},
];

const Discover = () => {
	const navigate = useNavigate();
	return (
		<div className="h-auto w-full flex justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2  ">
				{Item.map((i) => (
					<div className="grid grid-cols-2 bg-gray-100 h-100">
						<div className="w-full p-5 space-y-2 flex flex-col justify-center">
							<p className="text-xs font-bold">{i.label}</p>
							<div className="flex flex-col gap-3">
								<h1 className="text-3xl ">{i.title}</h1>
								<button
									onClick={() => navigate(`${i.navigation}`)}
									className="flex hover:gap-4 transition duration-300 items-center font-semibold gap-2 text-[#0C0C0C] w-full md:w-1/2"
								>
									Shop Now <FaArrowRightLong />
								</button>
							</div>
						</div>
						<div className="w-full">
							<img
								src={i.img}
								alt="run"
								className="w-full h-full object-center object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Discover;
