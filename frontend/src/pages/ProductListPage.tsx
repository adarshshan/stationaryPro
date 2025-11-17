import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import type { CartState } from "../store/useCartStore";
import type { Product } from "../types";
import Swal from "sweetalert2";
import api from "../api";
import { ShoppingCart, Package, IndianRupee } from "lucide-react";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state: CartState) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Load Products",
          text: "Please check your connection and try again.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.name} added successfully`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#10b981",
      color: "white",
      customClass: {
        popup: "animate__animated animate__fadeInRight",
      },
    });
  };

  // Shimmer Loading Skeleton
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-64 w-full"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
        <div className="h-10 bg-gray-300 rounded-lg mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Package className="w-12 h-12 text-indigo-600" />
            Our Products
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Discover amazing items at unbeatable prices
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-500">
                    No products available right now
                  </p>
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/api/placeholder/400/320"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x320?text=No+Image";
                        }}
                      />
                      {/* Badge if needed */}
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description ||
                          "Premium quality product with excellent features."}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-indigo-600 flex items-center">
                            <IndianRupee className="w-6 h-6" />
                            {product.price.toFixed(2)}
                          </p>
                          {product.price > 1000 && (
                            <p className="text-xs text-gray-500 line-through">
                              ₹{product.price * 1.5}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
