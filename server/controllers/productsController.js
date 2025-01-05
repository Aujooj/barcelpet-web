import { getAliveAnimalByType } from "../models/productsModel.js";

export async function listAliveAnimalByType(type, req, res) {
  const products = await getAliveAnimalByType(type);
  res.status(200).json(products);
}