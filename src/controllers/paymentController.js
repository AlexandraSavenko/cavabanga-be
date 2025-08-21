// controllers/paymentController.js
// Обробники запитів оплат

export const createPayment = async (req, res) => {
  res.json({ message: 'Оплата створена' });
};

export const getPaymentStatus = async (req, res) => {
  res.json({ status: 'Оплачено' });
};
