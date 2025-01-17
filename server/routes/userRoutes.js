import cors from "cors";
import express from "express";
import { login, register } from "../controllers/usersController.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);

};

export default routes;
