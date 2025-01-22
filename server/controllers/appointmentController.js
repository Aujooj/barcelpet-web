import prisma from "../prisma/prisma.js";

export async function getAvailableTimes(req, res) {
  const { date } = req.query;

  try {
    const selectedDate = new Date(date);

    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(19, 30, 0, 0));

    // Fetch all appointments for the given date
    const appointments = await prisma.appointment.findMany({
      where: {
        timeStart: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "Canceled", // Exclude canceled appointments
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

    // Generate all possible time slots for the selected date (from 9:30 to 19:00)
    const timeSlots = [];
    let currentTime = new Date(startOfDay);
    currentTime.setHours(9, 30, 0, 0); // Start time of the day

    while (currentTime <= endOfDay) {
      timeSlots.push(currentTime.toTimeString().slice(0, 5)); // Format as "HH:mm"
      currentTime = new Date(currentTime.getTime() + 30 * 60000); // Increment by 30 minutes
    }

    // Check for conflicts between available slots and existing appointments
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

    // Return available times in the response
    res.status(200).json({ availableTimes });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    res.status(500).json({ erro: "Internal server error" });
  }
}
