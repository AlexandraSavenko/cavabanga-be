import Recipe from "../models/Recipe.js";
import cloudinary from "../services/cloudinary.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, description, time, calories, category, ingredients, instructions } = req.body;
    if (!title || !description || !time || !category || !ingredients || !instructions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let photoUrl = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "recipes" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      photoUrl = result.secure_url;
    }
    const parsedIngredients = Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients);
    const newRecipe = await Recipe.create({
      title,
      description,
      time,
      calories: calories || undefined,
      category,
      ingredients: parsedIngredients,
      instructions,
      photo: photoUrl,
      userId: req.user.userId, 
    });
    return res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("CreateRecipe error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};