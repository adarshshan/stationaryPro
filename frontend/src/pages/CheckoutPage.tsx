import React, { useMemo, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { CartState } from "../store/useCartStore";
import type { AuthState } from "../store/useAuthStore";
import Swal from "sweetalert2";
import api from "../api";
import { Truck, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const items = useCartStore((state: CartState) => state.items);
  const clearCart = useCartStore((state: CartState) => state.clearCart);
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const user = useAuthStore((state: AuthState) => state.user);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(address).every(Boolean)) {
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to continue with your purchase.",
        confirmButtonColor: "#4f46e5",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await api.post("/orders", {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        total,
        address,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Order Placed Successfully! 🎉",
          text: "You’ll receive a confirmation email shortly.",
          confirmButtonColor: "#10b981",
        });
        clearCart();
        navigate("/");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong",
        text: error.response?.data?.message || "Please try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your order in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-8 sm:gap-16">
            {[
              { step: 1, label: "Address", icon: Truck },
              { step: 2, label: "Confirm", icon: CreditCard },
            ].map(({ step: s, label, icon: Icon }) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    step >= s
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step > s ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block ${
                    step >= s ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
                {s === 1 && (
                  <div
                    className={`w-24 sm:w-32 h-1 mx-4 transition-all ${
                      step >= 2 ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <Truck className="w-7 h-7 text-indigo-600" />
                    Delivery Address
                  </h2>

                  <form onSubmit={handleAddressSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={address.street}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                          placeholder="123 Main St, Apt 4B"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Mumbai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Maharashtra"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={address.zip}
                          onChange={handleAddressChange}
                          required
                          pattern="[0-9]{6}"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="400001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={address.country}
                          onChange={handleAddressChange}
                          required
                          disabled
                          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </form>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-7 h-7 text-indigo-600" />
                    Review Your Order
                  </h2>

                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-lg">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span className="text-indigo-600">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Address
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={items.length === 0}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {items.length === 0 ? "Cart is Empty" : "Place Order Now"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
