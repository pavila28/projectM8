const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nombre: {
        type: String,
        required: [true, 'Por favor teclea el nombre del producto']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor teclea el precio del producto']
    },
    descripcion: {
        type: String,
        required: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
