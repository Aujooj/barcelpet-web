import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Loading from "../components/Loading.tsx";
import Appointment from "../interfaces/Appointment.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { FcCancel } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";

const AppointmentsDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const statusOptions = ["Pendente", "Confirmado", "Finalizado", "Cancelado"];

  const handleCancel = async (id: number, status: string) => {
    try {
      if (status !== "Pendente") {
        throw new Error(
          `A marcação já foi ${status}. Não é possível cancelá-la!!`
        );
      }
      const response = await fetch(
        `http://localhost:3000/api/cancel/appointment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
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

  const handleStatusChange = async (appointmentId: number, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointment/${appointmentId}/status`,
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
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: status }
              : appointment
          )
        );
      } else {
        alert(data.message || "Erro ao atualizar status");
      }
    } catch (e) {
      alert(`Erro: ${e}`);
    }
  };
  const today = new Date();
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.day);
    return appointmentDate >= today;
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      user?.role === "admin"
        ? "http://localhost:3000/api/list/appointments"
        : `http://localhost:3000/api/list/appointments/${user?.id}`
    )
      .then((res) => res.json())
      .then((data) => setAppointments(data));

    setLoading(false);
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 flex flex-col bg-gray-100">
        <div className="absolute top-14 right-10">
          <button
            className="flex items-center space-x-2 text-primary hover:text-secondary transition p-2 rounded-lg"
            onClick={() => navigate("/dashboard/marcacoes/arquivo")}
          >
            <FaBoxArchive size={24} />
          </button>
        </div>
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg my-10">
          <h1 className="text-4xl font-bold text-center mb-10">
            Próximas Marcações
          </h1>
          <button
            className="self-center mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
            onClick={()=> navigate("adicionar")}
          >
            Adicionar
          </button>
          {loading ? (
            <Loading />
          ) : filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Não existem marcações neste momento.
            </p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Pet</th>
                  <th className="border p-2">Serviço</th>
                  <th className="border p-2">Preço</th>
                  <th className="border p-2">Data</th>
                  <th className="border p-2">Hora</th>
                  <th className="border p-2">Status</th>
                  {user?.role === "admin" ? (
                    ""
                  ) : (
                    <th className="border p-2"></th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{appointment.id}</td>
                    <td className="border p-2">{appointment.petName}</td>
                    <td className="border p-2">
                      {appointment.service.category.title}
                    </td>
                    <td className="border p-2">
                      €{appointment.service.price.toFixed(2)}
                    </td>
                    <td className="border p-2">
                      {new Date(appointment.day).toLocaleDateString("pt-PT")}
                    </td>
                    <td className="border p-2">
                      {new Date(appointment.timeStart).toLocaleTimeString(
                        "pt-PT",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td className="border p-2">
                      {user?.role === "admin" ? (
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            handleStatusChange(appointment.id, e.target.value)
                          }
                          className="border p-1 rounded w-full"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{appointment.status}</span>
                      )}
                    </td>
                    {user?.role === "admin" ? (
                      ""
                    ) : (
                      <td
                        className="border p-2 cursor-pointer items-center"
                        onClick={() =>
                          handleCancel(appointment.id, appointment.status)
                        }
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

export default AppointmentsDashboard;
