//Importations
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require('./routes/user');
const userPosts = require('./routes/post');
const userComment = require('./routes/comment');

//Création de l'app express
const app = express();

//Authorisations requetes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Gestion données reçues
app.use(bodyParser.json());

//Gestion images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', userPosts);
app.use('/api/comment', userComment);

module.exports = app;
