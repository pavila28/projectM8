const express = require('express')
const router = express.Router()
const { createUser, loginUser, dataUser } = require('../controllers/userControllers')

router.post('/', createUser)

router.post('/login', loginUser)

router.get('/data', dataUser)

module.exports = router
