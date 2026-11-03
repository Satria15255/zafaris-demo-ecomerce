import runningImage from "@/assets/heroSection/discountImage.webp";
import discountImage from "@/assets/heroSection/dicountmaget.webp";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Discover = () => {
	const navigate = useNavigate();
	return (
		<div className="h-auto w-full ">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
				<div className="grid grid-cols-2 bg-gray-100 h-120">
					<div className="w-full p-5 space-y-2">
						<p className="text-xs font-bold">30% OFF</p>
						<div className="flex flex-col gap-3">
							<h1 className="text-3xl ">
								Explore the <br /> Running collection
							</h1>
							<button
								onClick={() =>
									navigate("/products?category=Running")
								}
								className="flex items-center font-semibold gap-2   text-[#0C0C0C] w-1/2"
							>
								Shop Now <FaArrowRightLong />
							</button>
						</div>
					</div>
					<div className="  w-full">
						<img
							src={runningImage}
							alt="run"
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 bg-gray-100 h-120">
					<div className="w-full p-5 space-y-2">
						<p className="text-xs font-bold">30% OFF</p>
						<div className="flex flex-col gap-3">
							<h1 className="text-3xl ">
								Check out today's <br /> Discounted products.
							</h1>
							<button
								onClick={() =>
									navigate("/products?category=Running")
								}
								className="flex items-center font-semibold gap-2   text-[#0C0C0C] w-1/2"
							>
								Shop Now <FaArrowRightLong />
							</button>
						</div>
					</div>
					<div className="  w-full">
						<img
							src={discountImage}
							alt="run"
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Discover;
