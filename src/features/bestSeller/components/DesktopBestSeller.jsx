import ProductCard from "@/features/products/components/ProductCard";

const DesktopBestSeller = ({ products, navigate }) => {
    return (
        <div className="w-full max-w-7xl mt-4 gap-4 px-3 grid grid-cols-4 place-items-center">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    productDetails={() => navigate(`/product/${product._id}`)}
                />
            ))}
        </div>
    );
};

export default DesktopBestSeller;
