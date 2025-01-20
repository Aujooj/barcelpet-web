import cors from "cors";
import express from "express";
import { createOrder, getOrderById, getOrdersByUser, updateOrderStatus } from "../controllers/ordersController.js";


const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  
  app.get("/api/order/:id", getOrderById);
  
  app.get("/api/orders/user/:userId", getOrdersByUser);

  app.post("/api/create/order", createOrder);
  
  app.put("/api/order/:id/status", updateOrderStatus);
}

export default routes;