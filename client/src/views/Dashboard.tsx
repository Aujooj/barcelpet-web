import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Loading from "../components/Loading.tsx";
import Order from "../interfaces/Order.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import { FcCancel } from "react-icons/fc";

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const statusOptions = [
    "Pendente",
    "Confirmado",
    "Enviado",
    "Finalizado",
    "Cancelado",
  ];

  const calculateTotal = (order: Order) => {
    return order.orderItems.reduce((total, item) => {
      return total + item.product?.price * item.quantity;
    }, 0);
  };

  const handleCancel = async (id: number, status: string) => {
    try {
      if (status !== "Pendente") {
        throw new Error(`O pedido já foi ${status}. Não é possível cancelá-lo!!`);
        
      }
      const response = await fetch(`http://localhost:3000/api/cancel/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Erro ao atualizar status");
      } else {
        window.location.reload();
      }
    } catch (e) {
      alert(`Erro: ${e}`);
    }
  };

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: status } : order
          )
        );
      } else {
        alert(data.message || "Erro ao atualizar status");
      }
    } catch (e) {
      alert(`Erro: ${e}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      user.role === "admin"
        ? "http://localhost:3000/api/orders"
        : `http://localhost:3000/api/orders/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));

    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg my-10">
          <h1 className="text-4xl font-bold text-center mb-10">Pedidos</h1>
          {loading ? (
            <Loading />
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Produtos</th>
                  <th className="border p-2">Telefone</th>
                  <th className="border p-2">Morada</th>
                  <th className="border p-2">Entrega</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Status</th>
                  {user?.role === "admin" ? (
                    ""
                  ) : (
                    <th className="border p-2"></th>
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">
                      {order.orderNumber}
                    </td>
                    <td className="border p-2">
                      <ul>
                        {order.orderItems.map((item) => (
                          <li key={item.id}>
                            {item.product?.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border p-2">{order.phone}</td>
                    <td className="border p-2">
                      {order.deliveryOption === "delivery"
                        ? "Receber em casa"
                        : order.deliveryOption === "pickup"
                        ? "Levantar"
                        : ""}
                    </td>
                    <td className="border p-2">{order.address}</td>
                    <td className="border p-2">
                      €{calculateTotal(order).toFixed(2)}
                    </td>
                    <td className="border p-2">
                      {user?.role === "admin" ? (
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="border p-1 rounded"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{order.status}</span>
                      )}
                    </td>
                    {user?.role === "admin" ? (
                      ""
                    ) : (
                      <td
                        className="border p-2 cursor-pointer items-center"
                        onClick={() => handleCancel(order.id, order.status)}
                      >
                        <FcCancel />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
