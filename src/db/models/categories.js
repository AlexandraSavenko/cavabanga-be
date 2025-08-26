import { model, Schema } from 'mongoose';

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CategoriesCollection = model('categories', categoriesSchema);
