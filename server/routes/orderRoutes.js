import cors from "cors";
import express from "express";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
} from "../controllers/ordersController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/api/orders", getAllOrders);
  app.get("/api/orders/:id", getOrdersByUser);
  app.post("/api/create/order", createOrder);
  app.put("/api/cancel/order", cancelOrder);
  app.put("/api/order/:id/status", updateOrderStatus);
};

export default routes;
