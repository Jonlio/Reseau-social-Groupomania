const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//Création d'un commentaire
exports.createComment = (req, res) => {
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader){
            const token = req.headers.authorization.split(' ')[1]; 
            result = jwt.verify(token, config.secret);
            models.Comment.create({ content: req.body.content, userId:result.id, commentId: req.params.id })
            .then(() => { res.status(201).json({ message: 'Commentaire enregistré !'}) })
            .catch(error => res.status(400).json({ error }));
        }
    }

//Suppression d'un commentaire
exports.deleteComment =  (req, res) => {
    models.Comment.findOne({ where: { postid: req.params.id } })
        .then(() => {
                models.Comment.destroy()
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                    .catch(error => res.status(400).json({ error }));  
        })
        .catch(error => res.status(500).json({ error }));
};