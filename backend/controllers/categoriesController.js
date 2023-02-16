const Category = require('../models/categoryModel')

/* 
    Method POST
    Getting all categories
*/
const addRoute = (req, res, next) => {
    if (!req.body.category) {
        return res.status(400).json("Fill in all the required fields");
    }

    const category = new Category({
        category: req.body.category,
    });

    category
        .save()
        .then((savedCategory) => {
            Category.findById(savedCategory._id)
                .select("category")
                .then((category) => {
                    res.status(201).json({
                        data: category,
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
}

/* 
    Method GET
    Getting all categories
*/
const getCategories = (req, res) => {
    Category.find()
        .then((categories) => {
            return res.status(200).json({ categories: categories });
        })
        .catch((err) => {
            return res.status(500).json("There was an error when getting categories");
        });
}

module.exports = {
    addRoute,
    getCategories
}