const TopProductCard = ({ product }) => {
	return (
		<div className="flex flex-col items-center">
			<div>
				<img
					src={product.image}
					alt={product.name}
					className="w-full rounded-3xl"
				/>
			</div>
			<h2>{product.name}</h2>
		</div>
	);
};

export default TopProductCard;
