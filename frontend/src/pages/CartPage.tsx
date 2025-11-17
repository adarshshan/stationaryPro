import React from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import type { CartItem } from "../store/useCartStore";
import { Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const total = items.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto px-5">
            {items.map((item: CartItem) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                      <label
                        htmlFor={`quantity-${item.id}`}
                        className="mr-2 text-gray-500"
                      >
                        Qty
                      </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-600 hover:text-red-400 cursor-pointer"
                        title="Remove from cart"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex justify-end gap-5 text-base font-medium text-gray-900">
              <p className="font-semibold">Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
