import {
  createProductAsync,
  getAliveAnimalByType,
  getAllAlive,
  getAllBrandsByAnimal,
  getAllFoods,
  getAllFoodsByBrand,
  getProductById,
  removeProductAsync,
  updateProductAsync,
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
  const [animalType, brandId] = options;
  const products = await getAllFoodsByBrand(animalType, brandId);
  res.status(200).json(products);
}

export async function readProductById(id, req, res) {
  const products = await getProductById(id);
  res.status(200).json(products);
}

export async function listAllAlive(req, res) {
  const products = await getAllAlive();
  res.status(200).json(products);
}

export async function listAllFoods(req, res) {
  const products = await getAllFoods();
  res.status(200).json(products);
}

export async function createProduct(data, req, res) {
  const product = await createProductAsync(data);
  res.status(201).json(product);
}

export async function updateProduct(data, req, res) {
  const product = await updateProductAsync(data);
  res.status(200).json(product);
}

export async function removeProduct(data, req, res) {
  const product = await removeProductAsync(data);
  res.status(200).json(product);
}
