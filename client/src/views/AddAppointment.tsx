import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import Service from "../interfaces/Service";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";

const AppointmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState(0);
  const [petName, setPetName] = useState<string>("");
  const [petType, setPetType] = useState<string>("");
  const [serviceOptions, setServiceOptions] = useState<Service[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(
    user?.id || null
  );
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/info/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      fetch("http://localhost:3000/info/users/user")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [user]);

  useEffect(() => {
    if (petType) {
      const filteredServices = services.filter(
        (service) => service.petType === petType
      );
      setServiceOptions(filteredServices);
    } else {
      setServiceOptions([]);
    }
  }, [petType]);

  const generateTimeSlots = () => {
    const slots: string[] = [];
    let start = new Date(selectedDate || new Date());
    let end = new Date(selectedDate || new Date());

    if (selectedDate?.getDay() === 3) {
      start.setHours(14, 0, 0, 0);
    } else {
      start.setHours(9, 30, 0, 0);
    }

    end.setHours(19, 30, 0, 0);

    while (start < end) {
      slots.push(start.toTimeString().slice(0, 5));
      start = new Date(start.getTime() + 30 * 60000);
    }
    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();

      fetch(
        `http://localhost:3000/api/appointments?date=${selectedDate.toISOString()}`
      )
        .then((res) => res.json())
        .then((data) => {
          const appointments = Array.isArray(data.availableTimes)
            ? data.availableTimes
            : [];

          const updatedSlots = slots.filter((slot) => {
            const slotTime = new Date(
              `${selectedDate.toISOString().split("T")[0]}T${slot}:00`
            );

            const isOccupied = appointments.some((appointmentTime) => {
              const appointmentStart = new Date(
                `${
                  selectedDate.toISOString().split("T")[0]
                }T${appointmentTime}:00`
              );
              const appointmentEnd = new Date(
                appointmentStart.getTime() + 30 * 60000
              );

              return slotTime >= appointmentStart && slotTime < appointmentEnd;
            });

            return isOccupied;
          });

          setAvailableTimes(updatedSlots);
          setSelectedTime("");
        })
        .catch((error) => {
          console.log(error);
          setAvailableTimes([]);
        });
    }
  }, [selectedDate]);

  const handleSubmit = async () => {
    try {
      const appointmentData = {
        petName: petName,
        ownerId: selectedUser,
        day: selectedDate,
        timeStart: new Date(
          `${selectedDate?.toISOString().split("T")[0]}T${selectedTime}`
        ),
        serviceId: selectedService,
        comment,
      };

      const response = await fetch(
        "http://localhost:3000/api/create/appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao criar marcação");
      }

      alert("Marcação agendada!");
      navigate(-1);
    } catch (error) {
      console.error("Erro ao criar marcação:", error);
      alert("Falha ao agendar marcação.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg my-10">
          <h1 className="text-4xl font-bold text-center mb-10">
            Agendar Marcação
          </h1>
          <div className="space-y-6 w-full">
            {user?.role === "admin" && (
              <div>
                <label className="m-1 block text-sm font-medium">Dono*</label>
                <select
                  value={selectedUser || ""}
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option defaultChecked disabled>
                    Selecione o Dono
                  </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative">
              <label className="m-1 block text-sm font-medium">
                Nome do Pet
              </label>
              <input
                type="text"
                name="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="m-1 block text-sm font-medium">
                Seu pet é um?*
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>
                  Escolha um tipo de pet
                </option>
                {[...new Set(services.map((service) => service.petType))].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type === "cao" ? "Cão" : "Gato"}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="m-1 block text-sm font-medium">
                Escolha a data*
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full p-2 border border-gray-300 rounded"
                dateFormat="dd-MM-yyyy"
                filterDate={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isSunday = date.getDay() === 0;
                  return date >= today && !isSunday;
                }}
                required
              />
            </div>

            <div>
              <label className="m-1 block text-sm font-medium">
                Horário da Marcação*
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value={""} defaultChecked disabled>
                  Escolha um horário
                </option>
                {availableTimes.length === 0 ? (
                  <option disabled>
                    Sem horários disponíveis, por favor selecione outro dia.
                  </option>
                ) : (
                  availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="m-1 block text-sm font-medium">
                Tipo de Serviço*
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value={0} defaultChecked disabled>
                  Escolha um serviço
                </option>
                {serviceOptions.map((service) => (
                  <option key={service.id} value={service.id}>
                    {petType === "gato"
                      ? `${service.category.title} - ${service.duration} minutes`
                      : `${service.category.title} ${
                          service.maxWeight !== 1000
                            ? `até ${service.maxWeight}`
                            : `+${service.minWeight}`
                        } Kg - €${service.price.toFixed(2)}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="m-1 block text-sm font-medium">
                Observações
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <p>(*) Campos Obrigatórios</p>
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDashboard;
