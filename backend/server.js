const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000

const app = express()

app.use('/api/productos', require('./routes/productsRoutes'))

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))
