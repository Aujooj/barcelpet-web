import { getAllServices } from "../models/servicesModel.js";

export async function listAllServices(req, res) {
  const posts = await getAllServices();
  res.status(200).json(posts);
}