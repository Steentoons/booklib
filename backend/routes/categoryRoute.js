const app = require('express');
const { addCategories, getCategories, putCategory, deleteCategores } = require('../controllers/categoriesController');

const router = app.Router()

// Handle routes...
router.post("/", addCategories);
router.get("/", getCategories);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategores);

module.exports = router;