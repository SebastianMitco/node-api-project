const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Category = require("../models/Category");
const User = require("../models/User");

// @desc        Get categories for the authenticated user
// @route       GET /api/v1/categories
// @access      Private
exports.getCategories = asyncHandler(async (req, res, next) => {

    req.body.user = req.user.id;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(
            new ErrorResponse(
                `User is not authorized to create category`,
                401
            )
        );
    }
    // Fetch categories created by the authenticated user
    const categories = await Category.find({user: req.user.id});
    res.status(201).json({
        success: true,
        data: categories,
    });

});

// @desc        Create new bootcamp
// @route       POST /api/v1/category/
// @access      Private
exports.createCategory = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(
            new ErrorResponse(
                `User is not authorized to create category`,
                401
            )
        );
    }
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        data: category,
    });
});