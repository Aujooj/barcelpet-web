import prisma from "../prisma/prisma.js";

export async function createOrderAsync(userId, totalAmount, cartItems) {
  const order = await prisma.order.create({
    data: {
      orderNumber: `Pedido-${Date.now()}`,
      status: "Pendente",
      userId: userId,
    },
  });

  const orderItems = await prisma.orderItem.createMany({
    data: cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    })),
  });

  return { order, orderItems };
}

export async function getOrderByIdAsync(id) {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return order; 
}

export async function getOrdersByUserAsync(userId) {
  const orders = await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: {
      orderItems: true,
    },
  });
  
  return orders;
}

export async function updateOrderStatusAsync(id, status) {
  const order = await prisma.order.update({
    where: { id: parseInt(id) },
    data: {
      status: status,
    },
  });
  return order; 
}
