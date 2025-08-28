import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const IngredientsCollection = model('ingredients', ingredientSchema);
