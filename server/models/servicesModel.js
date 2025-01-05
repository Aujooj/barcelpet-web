import prisma from "../prisma/prisma.js";

export async function getAllServices() {
  const services = await prisma.service.findMany();
  return services;
}
