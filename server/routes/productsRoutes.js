import cors from "cors";
import express from "express";
import {
  createProduct,
  listAliveAnimalByType,
  listAllBrandsByAnimal,
  listAllFoods,
  listAllFoodsByBrand,
  readProductById,
  removeProduct,
  updateProduct,
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
    readProductById(id, req, res);
  });

  app.post("/api/create/product", (req, res) => {
    const food = req.body;
    createProduct(food, req, res);
  });

  app.put("/api/update/product", (req, res) => {
    const product = req.body;
    updateProduct(product, req, res);
  });

  app.delete("/api/remove/product", (req, res) => {
    const product = req.body.id;
    removeProduct(product, req, res);
  });
};

export default routes;
