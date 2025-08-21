// services/productService.js
// Логіка отримання даних товарів

export const fetchAllProducts = async () => {
  return [
    { id: 1, name: 'Товар 1' },
    { id: 2, name: 'Товар 2' },
  ];
};

export const fetchProductById = async (id) => {
  return { id, name: `Товар ${id}` };
};
