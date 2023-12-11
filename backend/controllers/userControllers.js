const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const createUser = asyncHandler ( async (req, res) => {
    const { nombre, email, password } = req.body

    if(!nombre || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos del usuario')
    }

    //se verifica si el usuario existe
    const userExist = await User.findOne({ email })

    if(userExist){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear nuevo usuario
    const user = await User.create({
        nombre,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.nombre,
            email: user.email,
            admin: user.esAdmin
        })
    } else {
        res.status(400)
        throw new Error('Error al crear el usuario')
    }
})

const loginUser = asyncHandler ( async (req, res) => {
    res.status(201).json({ message: 'Usuario logeado' })
})

const dataUser = asyncHandler ( async (req, res) => {
    res.status(201).json({ message: 'Datos del usuario' })
})

module.exports = {
    createUser,
    loginUser,
    dataUser
}
