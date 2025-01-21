import {
  createServiceAsync,
  createServiceCategoryAsync,
  getAllServices,
  getAllServiceCategories,
  getServiceById,
  getServiceCategoryById,
  removeServiceAsync,
  removeServiceCategoryAsync,
  updateServiceAsync,
  updateServiceCategoryAsync,
} from "../models/servicesModel.js";

export async function listAllServices(req, res) {
  const services = await getAllServices();
  res.status(200).json(services);
}

export async function readServiceById(id, req, res) {
  const service = await getServiceById(id);
  res.status(200).json(service);
}

export async function createService(data, req, res) {
  const service = await createServiceAsync(data);
  res.status(201).json(service);
}

export async function updateService(data, req, res) {
  const service = await updateServiceAsync(data);
  res.status(200).json(service);
}

export async function removeService(data, req, res) {
  const service = await removeServiceAsync(data);
  res.status(200).json(service);
}

export async function listAllServiceCategories(req, res) {
  const serviceCategories = await getAllServiceCategories();
  res.status(200).json(serviceCategories);
}

export async function readServiceCategoryById(id, req, res) {
  const service = await getServiceCategoryById(id);
  res.status(200).json(service);
}

export async function createServiceCategory(data, req, res) {
  const servicecategory = await createServiceCategoryAsync(data);
  res.status(201).json(servicecategory);
}

export async function updateServiceCategory(data, req, res) {
  const servicecategory = await updateServiceCategoryAsync(data);
  res.status(200).json(servicecategory);
}

export async function removeServiceCategory(data, req, res) {
  const servicecategory = await removeServiceCategoryAsync(data);
  res.status(200).json(servicecategory);
}
