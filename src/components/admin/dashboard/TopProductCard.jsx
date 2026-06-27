const TopProductCard = ({ product }) => {
	console.log("top seller", product);
	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="flex justify-center">
				<img
					src={product.image}
					alt={product.name}
					className="w-3/5 rounded-3xl"
				/>
			</div>
			<div className="flex flex-col items-center   gap-3">
				<h2 className=" ">{product.name}</h2>
				<p className=" ">{product.totalSold} Sold</p>
			</div>
		</div>
	);
};

export default TopProductCard;
