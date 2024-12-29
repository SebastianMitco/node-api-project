const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { createCategory, getCategories} = require("../controllers/category");

router
    .route("/")
    .get(protect, authorize("publisher", "admin","user" ), getCategories)
    .post(protect ,authorize("publisher", "admin","user"), createCategory);

module.exports = router;