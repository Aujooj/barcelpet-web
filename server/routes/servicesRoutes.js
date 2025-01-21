import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import {
  createService,
  createServiceCategory,
  listAllServices,
  listAllServiceCategories,
  readServiceById,
  readServiceCategoryById,
  removeService,
  removeServiceCategory,
  updateService,
  updateServiceCategory,
} from "../controllers/servicesController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/assets/services/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newName = `service-${Date.now()}${ext}`;
    cb(null, newName);
  },
});

const upload = multer({ storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  // Services
  app.get("/info/services", listAllServices);
  app.get("/info/services/:id", (req, res) => {
    const id = parseInt(req.params.id);
    readServiceById(id, req, res);
  });

  app.post("/api/create/service", (req, res) => {
    const service = req.body;
    createService(service, req, res);
  });

  app.put("/api/update/service", (req, res) => {
    const service = req.body;
    updateService(service, req, res);
  });

  app.delete("/api/remove/service", (req, res) => {
    const service = req.body.id;
    removeService(service, req, res);
  });

  //Categories
  app.post("/serviceCategory/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res
      .status(200)
      .json({ imagePath: `/assets/services/${req.file.filename}` });
  });

  app.get("/info/serviceCategories", listAllServiceCategories);
  app.get("/info/serviceCategories/:id", (req, res) => {
    const id = parseInt(req.params.id);
    readServiceCategoryById(id, req, res);
  });

  app.post("/api/create/serviceCategory", (req, res) => {
    const serviceCategory = req.body;
    createServiceCategory(serviceCategory, req, res);
  });

  app.put("/api/update/serviceCategory", (req, res) => {
    const serviceCategory = req.body;
    updateServiceCategory(serviceCategory, req, res);
  });

  app.delete("/api/remove/serviceCategory", (req, res) => {
    const serviceCategory = req.body.id;
    removeServiceCategory(serviceCategory, req, res);
  });
};

export default routes;
