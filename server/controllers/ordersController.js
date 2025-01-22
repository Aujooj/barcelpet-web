import {
  cancelOrderbyId,
  createOrderAsync,
  getOrdersByUserAsync,
  updateOrderStatusAsync,
  getAllOrdersAsync,
} from "../models/ordersModel.js";

export async function createOrder(req, res) {
  const {
    userId,
    cartItems,
    deliveryOption,
    address,
    city,
    postal_code,
    phone,
  } = req.body;
  try {
    let newAddress = address + ", " + city + " - " + postal_code;
    const order = await createOrderAsync(
      userId,
      cartItems,
      deliveryOption,
      newAddress,
      phone
    );
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
}

export async function getOrdersByUser(req, res) {
  const { id } = req.params;
  const userId = parseInt(id);
  try {
    const orders = await getOrdersByUserAsync(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await updateOrderStatusAsync(id, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await getAllOrdersAsync();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
}

export async function cancelOrder(req, res) {
  const { id } = req.body;
  const orderId = parseInt(id);
  console.log(id);

  try {
    const order = await cancelOrderbyId(orderId);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Pedido não pode ser cancelado" });
  }
}
