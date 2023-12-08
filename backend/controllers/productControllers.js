const getProduct = (req, res) => {
    res.status(200).json({ message: 'Obtener productos' })
}

const createProduct = (req, res) => {
    res.status(201).json({ message: 'Crear producto' })
}

const updateProduct = (req, res) => {
    res.status(200).json({ message: `Producto actualizado: ${req.params.id}` })
}

const deleteProduct = (req, res) => {
    res.status(200).json({ message: `Producto eliminado: ${req.params.id}` })
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
