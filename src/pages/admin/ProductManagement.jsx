import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductsTable from "@/components/admin/ProductsTable";
import ProductsUploadForm from "@/components/admin/ProductsUploadForm";
import ProductsEditForm from "@/components/admin/ProductsEditForm";
import { getAllProducts, deleteProduct } from "@/api/Api";
import DashboardStatsCard from "@/components/admin/DashboardStatsCard";

import { IoBagOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 6;

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

  const ProductStats = [
    {
      key: 48,
      title: "Product",
      icon: <IoBagOutline />,
    },
    {
      key: 4,
      title: "Categories",
      icon: <TbCategory2 />,
    },
    {
      key: 8,
      title: "Brand",
      icon: <CiShoppingTag />,
    },
    {
      key: 2900,
      title: "Value",
      icon: <FaChartLine />,
    },
  ];

  // Product Pagination
  const totalPages = Math.ceil(products.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const getPagination = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    // halaman 1-3
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // halaman terakhir
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // halaman tengah
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="w-full flex flex-col space-y-6 p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Product </p>
          <p className="text-sm text-gray-700">
            Manage and organize our products easily
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className=" border border-black bg-black text-white hover:bg-white transition duration-100 hover:text-black py-2 px-5 rounded-lg flex items-center justify-center"
        >
          + Add New Product
        </button>
      </div>

      <div className="flex justify-around gap-4 ">
        {ProductStats.map((item) => (
          <DashboardStatsCard
            key={item.key}
            title={item.title}
            value={item.key}
            icon={item.icon}
          />
        ))}
      </div>

      <div>
        <ProductsTable
          products={currentProducts}
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDelete}
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstProduct + 1} -{" "}
            {Math.min(indexOfLastProduct, products.length)} of {products.length}{" "}
            products
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === 1
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              ←
            </button>

            <div className="flex gap-2">
              {getPagination().map((item, index) =>
                item === "..." ? (
                  <span
                    key={index}
                    className="w-10 h-10 flex items-center justify-center text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(item)}
                    className={`w-10 h-10 rounded-lg border border-gray-200 transition
        ${currentPage === item ? "bg-black text-white" : "hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg transition
      ${
        currentPage === totalPages
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-black hover:text-white"
      }`}
            >
              →
            </button>
          </div>
        </div>
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
