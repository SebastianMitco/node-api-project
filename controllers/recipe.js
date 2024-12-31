const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// @desc        Get Recipes for the authenticated user
// @route       GET /api/v1/recipes
// @access      Private
exports.getRecipes = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(
      new ErrorResponse(`User is not authorized to create category`, 401),
    );
  }
  // Fetch recipes created by the authenticated user
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(201).json({
    success: true,
    data: recipes,
  });
});

// @desc        Create new Recipe
// @route       POST /api/v1/recipes
// @access      Private
exports.createRecipe = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(
      new ErrorResponse(`User is not authorized to create category`, 401),
    );
  }
  const category = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});
