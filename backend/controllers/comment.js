const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//Création d'un commentaire
exports.createComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    result = jwt.verify(token, config.secret);
    models.Comment.create({ content: req.body.content, userId:result.id, postId: req.params.id })
        .then(() => { res.status(201).json({ message: 'Commentaire enregistré !'}) })
        .catch(error => res.status(400).json({ error }));
    }

//Récupération des commentaires
exports.getAllComments = (req, res) => {
    models.Comment.findAll({
        where: { postId: req.params.id },
        include: [{
            model: models.User,
            attributes: ['firstName']
        }]
    })
    .then(post => { res.status(200).json(post); })
    .catch((error) => { res.status(400).json({ error }) });
}
    
//Suppression d'un commentaire
exports.deleteComment =  (req, res) => {
    models.Comment.findOne({ where: { id: req.params.id } })
        .then((comment) => {
             comment.destroy()
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));  
        })
        .catch(error => res.status(500).json({ error }));
};

