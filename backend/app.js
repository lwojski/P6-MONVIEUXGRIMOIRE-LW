const express = require('express')
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://wojskililian:2wVXYhHV8uLEf0kg@p6-grimoire.ke6qg.mongodb.net/?retryWrites=true&w=majority&appName=P6-GRIMOIRE')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => {
        console.log('Connexion à MongoDB échouée !');
        console.error('Détails de l\'erreur :', error);
});

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app