const models = require('../models');
const fs = require('fs');

//Création d'une publication
exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.post);
        models.Post.create({ ...postObject, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
        .then(() => { res.status(201).json({ message: 'Publication enregistrée !'}) })
        .catch(error => res.status(400).json({ error }));
}

//Affichage de toutes les publications
exports.getAllPosts = (req, res) => {
    models.Post.findAll()
        .then(posts => { return res.status(200).send(posts) })
        .catch(error => res.status(400).json({ error }));
}

//Affichage d'une publication
exports.getPost = (req, res) => {
    models.Post.findOne({ where: { id: req.params.id } })
        .then(post => { return res.status(200).send(post) })
        .catch(error => res.status(400).json({ error }));
}

//Suppression d'une publication
exports.deletePost =  (req, res) => {
    models.Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.destroy()
                    .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
