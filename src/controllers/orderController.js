// controllers/orderController.js
// Обробники запитів замовлень

import { fetchAllOrders, fetchOrderById } from '../services/orderService.js';

export const getAllOrders = async (req, res) => {
  const orders = await fetchAllOrders();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await fetchOrderById(req.params.id);
  res.json(order);
};
