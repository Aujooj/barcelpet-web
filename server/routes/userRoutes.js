import cors from "cors";
import express from "express";
import { login, register, update} from "../controllers/usersController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.put("/api/users/update/:id", update);

};

export default routes;
