// services/orderService.js
// Логіка отримання даних замовлень

export const fetchAllOrders = async () => {
  return [{ id: 1, total: 100 }];
};

export const fetchOrderById = async (id) => {
  return { id, total: 100 };
};
