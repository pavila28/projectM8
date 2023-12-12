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
    //se desestructura el body
    const { email, password } = req.body

    //se verifica que exista el usuario
    const user = await User.findOne({ email })

    //verificamos usuario y contraseña
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.nombre,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const dataUser = asyncHandler ( async (req, res) => {
    res.status(201).json(req.user)
})

//funcion para generar un JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
    dataUser
}
