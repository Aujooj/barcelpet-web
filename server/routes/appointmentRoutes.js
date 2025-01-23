import cors from "cors";
import express from "express";
import {
  cancelAppointment,
  createAppointment,
  getAllAppointments,
  getAppointmentsByUser,
  getAvailableTimes,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/api/appointments", getAvailableTimes);

  app.get("/api/list/appointments", getAllAppointments);
  app.get("/api/list/appointments/:userId", getAppointmentsByUser);

  app.post("/api/create/appointment", (req, res) => {
    const appointment = req.body;
    createAppointment(appointment, req, res);
  });

    app.put("/api/cancel/appointment", cancelAppointment);
    app.put("/api/appointment/:id/status", updateAppointmentStatus);
};

export default routes;
