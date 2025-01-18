import cors from "cors";
import express from "express";
import {
  listAliveAnimalByType,
  listAllBrandsByAnimal,
  listAllFoods,
  listAllFoodsByBrand,
  ReadProductById,
} from "../controllers/productsController.js";

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

  app.get("/info/food", listAllFoods);

  app.get("/info/food/brands/:type", (req, res) => {
    const animalType = req.params.type;
    listAllBrandsByAnimal(animalType, req, res);
  });

  app.get("/info/food/brands/:type/:brand", (req, res) => {
    const type = req.params.type;
    const brand = req.params.brand;
    listAllFoodsByBrand([type, brand], req, res);
  });

  app.get("/info/food/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    ReadProductById(id, req, res);
  });
};

export default routes;
