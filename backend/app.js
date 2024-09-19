require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')

mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@${process.env.MONGOOSE_URL}/?retryWrites=true&w=majority&appName=${process.env.MONGOOSE_DB_NAME}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => {
        console.log('Connexion à MongoDB échouée !')
        console.error('Détails de l\'erreur :', error)
})

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())

app.use('/api/books', booksRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app