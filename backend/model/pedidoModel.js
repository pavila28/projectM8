const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cliente: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    direccion: {
        type: String,
        required: [true, 'Por favor teclea la dirección de envío']
    },
    productos: {
        type: String,
        required: [true, 'Por favor selecciona los items de tu pedido']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)
