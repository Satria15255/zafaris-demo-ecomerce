import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductsTable from "@/components/admin/ProductsTable";
import ProductsUploadForm from "@/components/admin/ProductsUploadForm";
import ProductsEditForm from "@/components/admin/ProductsEditForm";
import { getAllProducts, deleteProduct } from "@/api/Api";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure want to delete this product?")) return;
      await deleteProduct(id);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed delete product");
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    fetchProducts();
  };

  const handleEditSucces = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Product Management</h1>

        <button
          onClick={() => setIsUploadOpen(true)}
          className=" border border-black hover:bg-gray-900 transition duration-100 hover:text-white py-2 px-3 rounded-lg font-semibold flex justify-center"
        >
          Add Product
        </button>
      </div>

      <div>
        <ProductsTable
          products={products}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDelete}
        />
      </div>

      {isUploadOpen && (
        <ProductsUploadForm
          onClose={() => setIsUploadOpen(false)}
          onSucces={handleUploadSuccess}
        />
      )}

      {editingProduct && (
        <ProductsEditForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSucces={handleEditSucces}
        />
      )}
    </div>
  );
};

export default ProductManagement;
