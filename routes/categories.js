const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const { createCategory} = require("../controllers/category");

router
    .route("/")
    .post(protect ,authorize("publisher", "admin","user"), createCategory);

module.exports = router;