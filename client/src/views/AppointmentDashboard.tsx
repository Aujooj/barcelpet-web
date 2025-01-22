import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import Service from "../interfaces/Service";
import User from "../interfaces/User";

const AppointmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>(""); // Only time
  const [petType, setPetType] = useState<string>("");
  const [serviceOptions, setServiceOptions] = useState<Service[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(
    user?.id || null
  );
  const [comment, setComment] = useState<string>("");

  // Fetch services and users (admin role)
  useEffect(() => {
    fetch("http://localhost:3000/info/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));

    if (user?.role === "admin") {
      fetch("http://localhost:3000/info/users/user")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [user]);

  // Filter services by petType
  useEffect(() => {
    if (petType) {
      const filteredServices = services.filter(
        (service) => service.petType === petType
      );
      setServiceOptions(filteredServices);
    } else {
      setServiceOptions([]);
    }
  }, [petType, services]);

  // Generate time slots based on the selected date
  const generateTimeSlots = () => {
    const slots: string[] = [];
    let start = new Date(selectedDate || new Date());
    let end = new Date(selectedDate || new Date());

    if (selectedDate?.getDay() === 3) {
      start.setHours(14, 0, 0, 0); // Wednesday-specific start time
    } else {
      start.setHours(9, 30, 0, 0); // Default start time
    }

    end.setHours(19, 30, 0, 0); // End time

    while (start < end) {
      slots.push(start.toTimeString().slice(0, 5)); // Push HH:mm formatted time
      start = new Date(start.getTime() + 30 * 60000); // Increment by 30 minutes
    }
    return slots;
  };

  // Fetch available times based on the selected date and petType
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();
  
      fetch(
        `http://localhost:3000/api/appointments?date=${selectedDate.toISOString()}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Ensure we handle the availableTimes correctly
          const appointments = Array.isArray(data.availableTimes)
            ? data.availableTimes
            : [];
  
          // If availableTimes is empty, set all generated slots as available times
          const updatedSlots = slots.filter((slot) => {
            const slotTime = new Date(
              `${selectedDate.toISOString().split("T")[0]}T${slot}:00`
            );
  
            // Check if any slot is occupied by an appointment
            const isOccupied = appointments.some((appointmentTime) => {
              const appointmentStart = new Date(
                `${selectedDate.toISOString().split("T")[0]}T${appointmentTime}:00`
              );
              const appointmentEnd = new Date(
                appointmentStart.getTime() + 30 * 60000 // Assume each appointment lasts 30 minutes
              );
  
              return slotTime >= appointmentStart && slotTime < appointmentEnd;
            });
  
            return isOccupied;
          });
  
          setAvailableTimes(updatedSlots);
          setSelectedTime(""); // Reset selected time when available times change
        })
        .catch((error) => {
          console.log(error);
          setAvailableTimes([]); // In case of error, clear available times
        });
    }
  }, [selectedDate]);
  

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !petType || !selectedUser) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const selectedService = serviceOptions.find(
        (s) => s.id === parseInt(selectedTime)
      );

      if (!selectedService) {
        alert("Invalid service selected.");
        return;
      }

      const appointmentData = {
        petName: petType,
        ownerId: selectedUser,
        day: selectedDate,
        timeStart: new Date(
          `${selectedDate.toISOString().split("T")[0]}T${selectedTime}`
        ),
        serviceId: selectedService.id,
        comment,
      };

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      alert("Appointment successfully created!");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg my-10">
          <h1 className="text-4xl font-bold text-center mb-10">
            Set Appointment
          </h1>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Pet Type</label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="" disabled>
                  Select a pet type
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
              <label className="block text-sm font-medium">Service</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={service.id} value={service.id}>
                    {petType === "gato"
                      ? `${service.category.title} - ${service.duration} minutes`
                      : `${service.category.title} ${
                          service.maxWeight !== 1000
                            ? `até ${service.maxWeight}`
                            : `+${service.minWeight}`
                        } Kg - ${service.duration} minutes`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Available Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a time</option>
                {availableTimes.length === 0 ? (
                  <option disabled>No available times</option>
                ) : (
                  availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))
                )}
              </select>
            </div>

            {user?.role === "admin" && (
              <div>
                <label className="block text-sm font-medium">User</label>
                <select
                  value={selectedUser || ""}
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Select a user
                  </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
            >
              Create Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDashboard;
