const Category = require('../models/categoryModel')

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

// Method GET
// Getting a category
const getCategory = (req, res) => {
    // validation...
    if (!req.params.id) {
        return res.status(400).json("There was an error when getting the category")
    }

    Category.find({ _id: req.params.id })
        .then((category) => {
            return res.status(200).json({ category: category })
        })
        .catch((err) => {
            return res.status(500).json("There was an error when getting categories");
        });
}

/* 
    Method POST
    Getting all categories
*/
const addCategories = (req, res, next) => {
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
    Method PUT
    Updating the categories
*/
const putCategory = async(req, res) => {
    // Validation... 
    if (!req.body.category) {
        return res.status(400).json({ error: "The category field cannot be empty" })
    }

    try {
        const isCategoryId = await Category.exists({ _id: req.params.id })
        if (isCategoryId) {
            return res.status(400).json({ error: "Could not find a category with provided id" })
        }
    } catch (error) {
        return res.status(400).json({ error: "Could not find a category with provided id" })
    }
    // Updating the category...
    try {
        const category = await Category.findById(req.params.id)
        category.category = req.body.category
        category.save()
        res.status(200).json({ message: "The category was updated successifully" })
    } catch (error) {
        return res.status(500).json({ error: "Could not update the category" })
    }
}

/* 
    Method DELETE
    Deleting the categories
*/
const deleteCategores = async(req, res) => {
    // Validate the request...
    const categoryExists = await Category.exists({ _id: req.params.id })
    if (!categoryExists) {
        return res.status(400).json({ error: "Could not find category with that id" })
    }

    // Delete the category...
    try {
        const deletedCategory = await Category.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: "Category deleted successifully", data: deletedCategory })
    } catch (err) {
        res.status(500).json({ error: "Could not delete category" })
    }
}

module.exports = {
    addCategories,
    getCategories,
    putCategory,
    deleteCategores,
    getCategory
}