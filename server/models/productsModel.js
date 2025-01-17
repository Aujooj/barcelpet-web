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
