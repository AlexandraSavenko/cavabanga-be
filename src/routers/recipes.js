 const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); 


const authenticateToken = require('../middleware/authenticateToken'); 

router.post('/create', authenticateToken, async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Fill in all fields' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      authorId: req.user.id, 
    });
    await newRecipe.save();
    res.status(201).json({ message: 'The recipe has been created', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;