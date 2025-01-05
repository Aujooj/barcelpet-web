import cors from "cors";
import express from "express";
import { listAliveAnimalByType } from "../controllers/productsController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/info/animals/:type", (req, res) => {
    const animalType = req.params.type;
    listAliveAnimalByType(animalType, req, res);
  });
};

export default routes;
