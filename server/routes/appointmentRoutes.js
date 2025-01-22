import cors from "cors";
import express from "express";
import { getAvailableTimes } from "../controllers/appointmentController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/api/appointments", getAvailableTimes);
};

export default routes;
