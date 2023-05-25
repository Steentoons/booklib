const express = require("express")
const getCategoryFilter = require("../controllers/filterCategoryController")
const verifyToken = require("../middlewares/tokenVerification")
const router = express.Router()

router.get('/:id', verifyToken, getCategoryFilter)

module.exports = router