import express from "express";
import servicesRoutes from "./routes/servicesRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/userRoutes.js";

const app = express();

servicesRoutes(app);
contactRoutes(app);
productsRoutes(app);
usersRoutes(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
