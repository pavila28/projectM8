const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const { findByIdAndDelete } = require('../model/productModel')

const getProduct = asyncHandler ( async (req, res) => {
    const products = await Product.find({ user: req.user.id })

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
        descripcion: req.body.descripcion,
        user: req.user.id
    })

    res.status(201).json({ product })
})

const updateProduct = asyncHandler ( async (req, res) => {
    const product = await Product.findById(req.params.id)

    //se verifica que el producto existe
    if(!product){
        res.status(400)
        throw new Error('El producto no fue encontrado')
    }

    //se verifica que el producto pertenezca al usuario del token que lo quiera modificar
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json(productUpdated)
    }
})

const deleteProduct = asyncHandler ( async (req, res) => {
    //se verifica que la tarea exista
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('El producto no fue encontrado')
    }

    //se verifica que el producto pertenezca al usuario del token que lo quiera modificar
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        await Product.deleteOne(product)
        //await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
