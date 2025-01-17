import {
  getAliveAnimalByType,
  getAllBrandsByAnimal,
  getAllFoodsByBrand,
  getProductById,
} from "../models/productsModel.js";

export async function listAliveAnimalByType(type, req, res) {
  const products = await getAliveAnimalByType(type);
  res.status(200).json(products);
}

export async function listAllBrandsByAnimal(type, req, res) {
  const brands = await getAllBrandsByAnimal(type);
  res.status(200).json(brands);
}

export async function listAllFoodsByBrand(options, req, res) {
  const [ animalType, brandId ] = options;  
  const products = await getAllFoodsByBrand(animalType, brandId);
  res.status(200).json(products);
}

export async function ReadProductById(id, req, res) {  
  const products = await getProductById(id);
  res.status(200).json(products);
}
