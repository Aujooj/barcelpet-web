
import {
  createOrderAsync,
  getOrderByIdAsync,
  getOrdersByUserAsync,
  updateOrderStatusAsync,
} from "../models/ordersModel.js";

export async function createOrder(req, res) {
  const { userId, totalAmount, cartItems } = req.body;
  try {
    const order = await createOrderAsync(userId, totalAmount, cartItems);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await getOrderByIdAsyncRS(id);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
}

export async function getOrdersByUser(req, res) {
  const { userId } = req.params;
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
