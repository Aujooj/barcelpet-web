import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { cart, calculateTotalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const DELIVERY_FEE = 4.95;

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postal_code: user?.postal_code || "",
    paymentMethod: "mb_way",
    deliveryOption: "delivery",
  });

  const totalAmount = calculateTotalPrice();
  const totalWithDelivery =
    formData.deliveryOption === "delivery"
      ? totalAmount + DELIVERY_FEE
      : totalAmount;

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/dashboard");
    }
  }, [cart.items.length, navigate]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const orderData = {
      userId: user?.id,
      totalAmount: totalWithDelivery,
      cartItems: cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      deliveryOption: formData.deliveryOption,
      address: formData.address,
      city: formData.city,
      postal_code: formData.postal_code,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const response = await fetch("http://localhost:3000/api/create/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the order");
      }

      const responseData = await response.json();
      
      navigate("/dashboard/thank-you", {
        state: {
          orderTotal: totalWithDelivery.toFixed(2),
          delivery: formData.deliveryOption === "delivery",
          orderId: responseData.order.id,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 p-10 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Finalizar Compra
          </h1>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-4">Itens no Carrinho</h2>
              <div className="space-y-4">
                {cart.items.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Seu carrinho está vazio.
                  </p>
                ) : (
                  cart.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-center p-4 border border-gray-300 rounded"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <p className="font-bold">{item.product.name}</p>
                          <p>{`Preço: €${item.product.price}`}</p>
                          <p>{`Quantidade: ${item.quantity}`}</p>
                        </div>
                      </div>
                      <p className="font-bold">{`€${(
                        item.product.price * item.quantity
                      ).toFixed(2)}`}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:w-1/3">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
              <div className="p-4 border border-gray-300 rounded">
                <div className="flex justify-between mb-2">
                  <p>Subtotal:</p>
                  <p>{`€${totalAmount.toFixed(2)}`}</p>
                </div>
                {formData.deliveryOption === "delivery" && (
                  <div className="flex justify-between mb-2">
                    <p>Entrega:</p>
                    <p>{`€${DELIVERY_FEE.toFixed(2)}`}</p>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <p>Total:</p>
                  <p>{`€${totalWithDelivery.toFixed(2)}`}</p>
                </div>
                {formData.deliveryOption === "delivery" ? (
                  <p className="text-sm text-gray-500 mt-2">
                    A entrega levará de 1 a 2 dias úteis.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    O produto pode ser levantado na loja imediatamente após a
                    confirmação do pedido.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Informações do Cliente</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Telefone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <label className="block font-medium">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex-grow">
                  <label className="block font-medium">Código Postal</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Opção de Entrega</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="delivery"
                      checked={formData.deliveryOption === "delivery"}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    Receber em casa (€4.95)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="pickup"
                      checked={formData.deliveryOption === "pickup"}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    Levantar na loja
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-medium">Método de Pagamento</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="mb_way">MB WAY</option>
                </select>
              </div>
              <p>A confirmação do pagamento pode levar até 24 horas.</p>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full p-2 bg-primary text-white rounded hover:bg-secondary transition"
              >
                Finalizar Compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
