const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a recipe title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  cookingTime: {
    type: Number,
    required: true,
    description: "The time in minutes required to cook the recipe.",
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
