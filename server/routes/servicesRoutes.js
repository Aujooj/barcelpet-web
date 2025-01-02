import cors from "cors";
import express from "express";
import { listAllServices } from "../controllers/servicesController.js";


const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/info/services", listAllServices);
};

export default routes;
