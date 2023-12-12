const express = require('express')
const router = express.Router()
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getProduct)

router.post('/',protect, createProduct)

router.put('/:id', protect, updateProduct)

router.delete('/:id',protect, deleteProduct)

module.exports = router