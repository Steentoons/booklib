const app = require('express');
const { addCategories, getCategories, putCategory, deleteCategores } = require('../controllers/categoriesController');
const verifyToken = require('../middlewares/tokenVerification');

const router = app.Router()

// Handle routes...
router.post("/", verifyToken, addCategories);
router.get("/", verifyToken, getCategories);
router.put("/:id", verifyToken, putCategory);
router.delete("/:id", verifyToken, deleteCategores);

module.exports = router;