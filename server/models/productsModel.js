import prisma from "../prisma/prisma.js";

export async function getAliveAnimalByType(type) {
  const products = await prisma.product.findMany({
    where: {
      brand: { contains: "Pet" },
      type: { contains: type },
    },
    orderBy: {
      name: "asc",
    },
  });
  console.log(products);

  return products;
}
