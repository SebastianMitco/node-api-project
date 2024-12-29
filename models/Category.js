const mongoose = require("mongoose");
const slugify = require("slugify");
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    description: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});
//Create bootcamp slug from the name
CategorySchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
module.exports = mongoose.model('Category', CategorySchema);