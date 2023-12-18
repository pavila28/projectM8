const asyncHandler = require('express-async-handler')
const Pedido = require('../model/pedidoModel')
//const { findByIdAndDelete } = require('../model/pedidoModel')

const getPedido = asyncHandler ( async (req, res) => {
    const pedidos = await Pedido.find({ user: req.user.id })

    res.status(200).json({ pedidos })
})

const createPedido = asyncHandler ( async (req, res) => {
    if(!req.body.cliente){
        res.status(400)
        throw new Error('Por favor teclea tu nombre')
    }

    const pedido = await Pedido.create({
        cliente: req.body.cliente,
        direccion: req.body.direccion,
        productos: req.body.productos,
        user: req.user.id
    })

    res.status(201).json({ pedido })
})

const deletePedido = asyncHandler ( async (req, res) => {
    //se verifica que el producto exista
    const pedido = await Pedido.findById(req.params.id)

    if(!pedido){
        res.status(400)
        throw new Error('El pedido no fue encontrado')
    }

    //se verifica que el pedido pertenezca al usuario del token que lo quiera modificar
    if(pedido.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso no autorizado')
    } else {
        await Pedido.deleteOne(pedido)
        
        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getPedido,
    createPedido,
    deletePedido
}
