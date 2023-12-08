const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/productos', require('./routes/productsRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))
