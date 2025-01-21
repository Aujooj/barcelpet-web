import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  listAliveAnimalByType,
  listAllAlive,
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/assets/products/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newName = `image-${Date.now()}${ext}`;
    cb(null, newName); 
  },
});

const upload = multer({ storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.post("/product/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ imagePath: `/assets/products/${req.file.filename}` });
  });

  app.get("/info/animals/:type", (req, res) => {
    const animalType = req.params.type;
    listAliveAnimalByType(animalType, req, res);
  });

  app.get("/info/food/brands/:type", (req, res) => {
    const animalType = req.params.type;
    listAllBrandsByAnimal(animalType, req, res);
  });

  app.get("/info/food/brands/:type/:brand", (req, res) => {
    const type = req.params.type;
    const brand = req.params.brand;
    listAllFoodsByBrand([type, brand], req, res);
  });

  app.get("/info/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    readProductById(id, req, res);
  });

  app.get("/info/alive", listAllAlive);

  app.get("/info/food", listAllFoods);

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
