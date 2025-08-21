import { model, Schema } from 'mongoose';

const categorieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CategoriesCollection = model('categories', categorieSchema);
