import prisma from "../prisma/prisma.js";

export async function getAllServices() {
  const services = await prisma.service.findMany({
    include: { category: true },
    orderBy: [
      {
        category: {
          title: "asc",
        },
      },
      {
        petType: "asc",
      },
      {
        minWeight: "asc",
      },
    ],
  });
  return services;
}

export async function getServiceById(sId) {
  const service = await prisma.service.findUnique({
    include: { category: true },
    where: {
      id: sId,
    },
  });

  return service;
}

export async function createServiceAsync(service) {
  const { categoryId, petType, minWeight, maxWeight, price, duration } =
    service;
  const newService = await prisma.service.create({
    data: { categoryId, petType, minWeight, maxWeight, price, duration },
  });
  return newService;
}

export async function updateServiceAsync(service) {
  const { id, categoryId, petType, minWeight, maxWeight, price, duration } = service;
  const response = await prisma.service.update({
    where: { id: id },
    data: { categoryId, petType, minWeight, maxWeight, price, duration },
  });
  return response;
}

export async function removeServiceAsync(id) {
  const response = await prisma.service.delete({ where: { id: id } });
  return response;
}

export async function getAllServiceCategories() {
  const serviceCategories = await prisma.serviceCategory.findMany({
    orderBy: {
      title: "asc",
    },
  });
  return serviceCategories;
}

export async function getServiceCategoryById(scId) {
  const serviceCategory = await prisma.serviceCategory.findUnique({
    where: {
      id: scId,
    },
  });

  return serviceCategory;
}

export async function createServiceCategoryAsync(servicecategory) {
  const { title, description, image } = servicecategory;
  const newServiceCategory = await prisma.serviceCategory.create({
    data: {
      title,
      description,
      image,
    },
  });
  return newServiceCategory;
}

export async function updateServiceCategoryAsync(servicecategory) {
  const { id, title, description, image } = servicecategory;
  const response = await prisma.serviceCategory.update({
    where: { id: id },
    data: {
      title,
      description,
      image,
    },
  });
  return response;
}

export async function removeServiceCategoryAsync(id) {
  const response = await prisma.serviceCategory.delete({ where: { id: id } });
  return response;
}
