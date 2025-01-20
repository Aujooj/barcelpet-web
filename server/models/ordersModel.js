import prisma from "../prisma/prisma.js";

export async function createOrderAsync(
  userId,
  cartItems,
  deliveryOption,
  address,
  phone
) {
  const order = await prisma.order.create({
    data: {
      orderNumber: `BP${userId}P${Date.now()}`,
      status: "Pendente",
      userId: userId,
      deliveryOption: deliveryOption,
      address: address,
      phone: phone,
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
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    where: { id: userId },
    orderBy: {
      orderNumber: "desc",
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

export async function getAllOrdersAsync() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      orderNumber: "desc",
    },
  });
  return orders;
}

export async function cancelOrderbyId(orderId) {
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: "Cancelado" },
  });

  return updatedOrder;
}
