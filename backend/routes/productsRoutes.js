const express = require('express')
const router = express.Router()
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')

router.get('/', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

module.exports = router