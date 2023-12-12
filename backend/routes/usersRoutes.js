const express = require('express')
const router = express.Router()
const { createUser, loginUser, dataUser } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

//public
router.post('/', createUser)
router.post('/login', loginUser)

//private
router.get('/data', protect, dataUser)

module.exports = router
