import { createContext, useContext, useState } from "react";
import ProductModal from "@/features/products/components/ProductModal";

const ProductModalContext = createContext();

export const ProductModalProvider = ({ children }) => {
	const [selectedProduct, setSelectedProduct] = useState(null);

	const openProductModal = (product) => {
		setSelectedProduct(product);
	};

	const closeProductModal = () => {
		setSelectedProduct(null);
	};

	return (
		<ProductModalContext.Provider
			value={{ openProductModal, closeProductModal }}
		>
			{children}
			{selectedProduct && (
				<ProductModal
					product={selectedProduct}
					closeModal={closeProductModal}
				/>
			)}
		</ProductModalContext.Provider>
	);
};

export const useProductModal = () => {
	return useContext(ProductModalContext);
};
