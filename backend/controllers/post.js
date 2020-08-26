const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//Création d'une publication
exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.post);
    const token = req.headers.authorization.split(' ')[1]; 
    result = jwt.verify(token, config.secret);
    models.Post.create({ ...postObject, userId:result.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    .then(() => { res.status(201).json({ message: 'Publication enregistrée !'}) })
    .catch(error => res.status(400).json({ error }));
}

//Affichage de toutes les publications
exports.getAllPosts = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['firstName']
        }]
    })
    .then(posts => { return res.status(200).send(posts) })
    .catch(error => res.status(400).json({ error }));
}

//Affichage d'une publication
exports.getPost = (req, res) => {
    models.Post.findOne({
        where: { id: req.params.id },
        include: [{
            model: models.User,
            attributes: ['firstName']
       }]
    })
    .then(post => { res.status(200).json(post); })
    .catch(error => res.status(400).json({ error }))
}

//Suppression d'une publication
exports.deletePost =  (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    result = jwt.verify(token, config.secret);
    
    models.Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            if (post.userId == result.id) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy()
                .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                .catch(error => res.status(400).json({ error }));
            });
            models.Comment.destroy({ where: { postId: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaires associés supprimés !' }))
            .catch(error => res.status(400).json({ error }));
        }})
        .catch(error => res.status(500).json({ error }));
};

