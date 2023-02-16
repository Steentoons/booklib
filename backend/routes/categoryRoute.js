const app = require('express');
const { addRoute, getCategories } = require('../controllers/categoriesController');

const router = app.Router()

// Handle routes...
router.post("/", addRoute);
router.get("/", getCategories);

module.exports = router;