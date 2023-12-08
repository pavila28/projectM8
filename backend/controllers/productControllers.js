const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getProduct = asyncHandler ( async (req, res) => {
    const products = await Product.find()

    res.status(200).json({ products })
})

const createProduct = asyncHandler ( async (req, res) => {
    if(!req.body.nombre){
        res.status(400)
        throw new Error('Por favor teclea el nombre del producto')
    }

    const product = await Product.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    })

    res.status(201).json({ product })
})

const updateProduct = asyncHandler ( async (req, res) => {
    res.status(200).json({ message: `Producto actualizado: ${req.params.id}` })
})

const deleteProduct = asyncHandler ( async (req, res) => {
    res.status(200).json({ message: `Producto eliminado: ${req.params.id}` })
})

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
