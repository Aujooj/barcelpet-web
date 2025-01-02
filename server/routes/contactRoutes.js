import cors from "cors";
import express from "express";
import { sendEmail } from "../controllers/contactController.js";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;
    console.log(req.body);

    try {
      const emailResponse = await sendEmail(to, subject, text, html);
      res.status(200).json({ message: 'Email sent successfully', response: emailResponse });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  });
};

export default routes;
