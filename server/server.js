import express from "express";
import cors from "cors";
import servicesRoutes from "./routes/servicesRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

const app = express();
app.use(cors());

servicesRoutes(app);
contactRoutes(app);
productsRoutes(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
