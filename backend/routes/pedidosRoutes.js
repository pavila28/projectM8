const express = require('express')
const router = express.Router()
const { getPedido, createPedido, deletePedido } = require('../controllers/pedidoControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getPedido)

router.post('/', protect, createPedido)

router.delete('/:id', protect, deletePedido)

module.exports = router
