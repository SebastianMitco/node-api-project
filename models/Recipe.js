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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
