const app = require('express');
const { addRoute, getCategories, putCategory } = require('../controllers/categoriesController');

const router = app.Router()

// Handle routes...
router.post("/", addRoute);
router.get("/", getCategories);
router.put("/:id", putCategory);

module.exports = router;