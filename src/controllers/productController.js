// controllers/productController.js
// Обробники запитів товарів

import {
  fetchAllProducts,
  fetchProductById,
} from '../services/productService.js';

export const getAllProducts = async (req, res) => {
  const products = await fetchAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await fetchProductById(req.params.id);
  res.json(product);
};
