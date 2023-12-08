const asyncHandler = require('express-async-handler')

const getProduct = asyncHandler ( async (req, res) => {
    res.status(200).json({ message: 'Obtener productos' })
})

const createProduct = asyncHandler ( async (req, res) => {
    if(!req.body.nombre){
        res.status(400)
        throw new Error('Por favor teclea el nombre del producto')
    }

    res.status(201).json({ message: 'Producto creado' })
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
