import prisma from "../prisma/prisma.js";

export async function getAliveAnimalByType(type) {
  const products = await prisma.product.findMany({
    where: {
      brand: { equals: "Pet" },
      type: { equals: type },
    },
    orderBy: {
      name: "asc",
    },
  });

  return products;
}

export async function getAllBrandsByAnimal(type) {
  const brands = await prisma.product.findMany({
    distinct: ["brand"],
    select: {
      brand: true,
    },

    where: {
      type: { equals: type },
    },
    orderBy: {
      brand: "asc",
    },
  });

  return brands
    .map((product) => product.brand)
    .filter((brand) => brand !== "Pet");
}

export async function getAllFoodsByBrand(type, brand) {
  const products = await prisma.product.findMany({
    where: {
      brand: { equals: brand },
      type: { equals: type },
    },
    orderBy: {
      name: "asc",
    },
  });

  return products;
}

export async function getProductById(pId) {
  const product = await prisma.product.findUnique({
    where: {
      id: pId,
    },
  });

  return product;
}

export async function getAllFoods() {
  const product = await prisma.product.findMany({
    where: {
      brand: { not: "Pet" },
    },
    orderBy: {
      name: "asc",
    },
  });
  return product;
}

export async function createProductAsync(product) {
  const {
    name,
    price,
    stock,
    weight,
    type,
    image,
    brand,
    features,
    benefits,
    composition,
    analytical,
    additional_additives,
    technological_additives,
  } = product;
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      stock,
      weight,
      type,
      image,
      brand,
      features,
      benefits,
      composition,
      analytical,
      additional_additives,
      technological_additives,
    },
  });
  return newProduct;
}

export async function updateProductAsync(product) {
  const {
    id,
    name,
    price,
    stock,
    weight,
    type,
    image,
    brand,
    features,
    benefits,
    composition,
    analytical,
    additional_additives,
    technological_additives,
  } = product;
  const response = await prisma.product.update({
    where: { id: id },
    data: {
      name,
      price,
      stock,
      weight,
      type,
      image,
      brand,
      features,
      benefits,
      composition,
      analytical,
      additional_additives,
      technological_additives,
    },
  });
  return response;
}

export async function removeProductAsync(id) {
  const response = await prisma.product.delete({ where: { id: id } });
  return response;
}
