const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { createRecipe, getRecipes} = require("../controllers/recipe");

router
    .route("/")
    .get(protect,authorize("publisher","admin","user"),getRecipes)
    .post(protect ,authorize("publisher", "admin","user"), createRecipe);

module.exports = router;