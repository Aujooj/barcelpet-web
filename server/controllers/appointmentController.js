import {
  cancelAppointmentbyId,
  createAppointmentAsync,
  findAvailableTimes,
  getAllAppointmentsAsync,
  listAppointmentByUserId,
  updateAppointmentStatusAsync,
} from "../models/appointmentModel.js";

import prisma from "../prisma/prisma.js";

export async function getAvailableTimes(req, res) {
  const { date } = req.query;

  try {
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(19, 30, 0, 0));

    const appointments = await findAvailableTimes(startOfDay, endOfDay);

    const timeSlots = [];
    let currentTime = new Date(startOfDay);
    currentTime.setHours(9, 30, 0, 0);

    while (currentTime <= endOfDay) {
      timeSlots.push(currentTime.toTimeString().slice(0, 5));
      currentTime = new Date(currentTime.getTime() + 30 * 60000);
    }

    const availableTimes = timeSlots.filter((slot) => {
      const slotTime = new Date(
        `${selectedDate.toISOString().split("T")[0]}T${slot}:00`
      );
      return !appointments.some((appointment) => {
        const appointmentStart = new Date(appointment.timeStart);
        const appointmentEnd = new Date(
          appointmentStart.getTime() + appointment.service.duration * 60000
        );

        return slotTime >= appointmentStart && slotTime < appointmentEnd;
      });
    });

    res.status(200).json({ availableTimes });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    res.status(500).json({ erro: "Internal server error" });
  }
}

export async function createAppointment(data, req, res) {
  const { petName, ownerId, day, timeStart, serviceId, comment } = data;
  const appointment = await createAppointmentAsync(
    petName,
    parseInt(ownerId),
    day,
    timeStart,
    parseInt(serviceId),
    comment
  );
  res.status(201).json(appointment);
}

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsAsync();

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await listAppointmentByUserId(userId);

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function cancelAppointment(req, res) {
  const { id } = req.body;
  const appointmentId = parseInt(id);

  try {
    const appointment = await cancelAppointmentbyId(appointmentId);
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Pedido não pode ser cancelado" });
  }
}

export async function updateAppointmentStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAppointment = await updateAppointmentStatusAsync(id, status);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating appointment status" });
  }
}