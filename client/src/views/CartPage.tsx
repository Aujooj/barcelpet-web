import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, calculateTotalPrice } = useCart();
  const [quantities, setQuantities] = useState<number[]>(cart.items.map((item) => item.quantity));
  const navigate = useNavigate();

  useEffect(() => {
    setQuantities(cart.items.map((item) => item.quantity)); // Sync local state with cart on initial load
  }, [cart.items]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const item = cart.items[index];
    if (newQuantity <= 0) {
      removeFromCart(item.product.id); // Remove item if quantity is 0 or below
    } else {
      // Update both local state and global state
      const updatedQuantities = [...quantities];
      updatedQuantities[index] = newQuantity;
      setQuantities(updatedQuantities);
      updateQuantity(item.product.id, newQuantity, item.product.stock); // Update global cart state
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 bg-gray-100 flex flex-col p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Seu Carrinho</h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-8">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-4">Imagem</th>
                <th className="border p-4">Produto</th>
                <th className="border p-4">Preço</th>
                <th className="border p-4">Quantidade</th>
                <th className="border p-4">Total</th>
                <th className="border p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    O seu carrinho está vazio.
                  </td>
                </tr>
              ) : (
                cart.items.map((item, index) => (
                  <tr key={item.product.id} className="hover:bg-gray-50">
                    <td className="border p-4 text-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border p-4">{item.product.name} - {item.product.weight}</td>
                    <td className="border p-4">{item.product.price} €</td>
                    <td className="border p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(index, quantities[index] - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-16 text-center border p-2 rounded"
                          value={quantities[index]}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              Math.max(1, parseInt(e.target.value))
                            )
                          }
                        />
                        <button
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(index, quantities[index] + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border p-4">
                      {item.product.price * quantities[index]} €
                    </td>
                    <td className="border p-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {cart.items.length > 0 && (
          <div className="flex justify-between items-center">
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400"
              onClick={handleClearCart}
            >
              Limpar Carrinho
            </button>
            <div className="text-xl font-semibold">
              Total: {calculateTotalPrice()} €
            </div>
            <button
              className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
