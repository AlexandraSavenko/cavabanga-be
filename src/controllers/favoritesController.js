export const addToFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.favorites.includes(id)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    req.user.favorites.push(id);
    await req.user.save();

    res.json({ message: "Added to favorites", favorites: req.user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    req.user.favorites = req.user.favorites.filter(
      (fav) => fav.toString() !== id
    );
    await req.user.save();

    res.json({ message: "Removed from favorites", favorites: req.user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
