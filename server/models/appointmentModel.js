import prisma from "../prisma/prisma.js";

export async function createAppointmentAsync(
  petName,
  ownerId,
  day,
  timeStart,
  serviceId,
  comment
) {
  const newProduct = await prisma.appointment.create({
    data: {
      petName,
      ownerId,
      day,
      timeStart,
      serviceId,
      comment,
    },
  });
  return newProduct;
}
export async function findAvailableTimes(start, end) {
  const appointments = await prisma.appointment.findMany({
    where: {
      timeStart: {
        gte: start,
        lte: end,
      },
      status: {
        not: "Canceled",
      },
    },
    include: {
      service: {
        select: {
          duration: true,
          petType: true,
        },
      },
    },
  });

  return appointments;
}

export async function cancelAppointmentbyId(appointmentId) {
  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "Cancelado" },
  });

  return updatedAppointment;
}

export async function updateAppointmentStatusAsync(id, status) {
  const appointment = await prisma.appointment.update({
    where: { id: parseInt(id) },
    data: {
      status: status,
    },
  });
  return appointment;
}

export async function listAppointmentByUserId(userId) {
  const appointments = await prisma.appointment.findMany({
    where: {
      ownerId: parseInt(userId),
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
    },
    orderBy: [
      {
        day: "asc",
      },
      {
        timeStart: "asc",
      },
    ],
  });
  return appointments;
}

export async function getAllAppointmentsAsync() {
  const appointments = await prisma.appointment.findMany({
    include: {
      service: {
        include: {
          category: true,
        },
      },
      owner: true,
    },
    orderBy: [
      {
        day: "asc",
      },
      {
        timeStart: "asc",
      },
    ],
  });
  return appointments;
}
