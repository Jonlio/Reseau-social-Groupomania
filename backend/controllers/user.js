const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');
const config = require('../config/auth.config');

//Création d'un utilisateur
exports.signup = (req, res) => {
    const securMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    const regexUser = /^[a-zA-Z]*$/;

    const userObject = JSON.parse(req.body.user); 

    if ((!regexUser.test(userObject.firstName)) || (!regexUser.test(userObject.lastName))) {
        return res.status(400).json({ message: 'Format Nom et Prenom invalide'});
    }
    if (!securMail.test(userObject.email)) {
        return res.status(400).json({ message: 'Format Email invalide'});
    }
    if (req.body.password.length < 7) {
        return res.status(400).json({ message: 'Le MDP doit contenir 7 caractères minimum'});
    }
    models.User.findOne({ where: { email: userObject.email } })
        .then(findUser => {
            if (findUser) {
                return res.status(401).json({ message: 'Cet utilisateur est déjà enregistré' });
            } else {
                 bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        models.User.create({ ...userObject, isAdmin: false, password:hash, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
                        .then(() => { res.status(201).send({ message: 'Profil enregistré !'}) })
                        .catch(error => res.status(400).json({ error }));
                    })
                .catch(error => res.status(500).json({ error }));
        }})
}

//Connexion utilisateur
exports.login = (req, res) => {
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                      return res.status(400).json({ error: 'Mot de passe incorrect!' });
                    }
                    return res.status(200).json({ token: jwt.sign({ id: user.id }, config.secret, { expiresIn: '24h'}) });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Affichage d'un profil
exports.getProfil = (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; 
        result = jwt.verify(token, config.secret);
        models.User.findOne({ where: { id: result.id },
            include: [{ model: models.Post }]
        })
        .then(user => { return res.status(200).send(user) })
        .catch(error => res.status(400).json({ error }));
}

//Affichage de tous les profils
exports.getAllProfils = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    result = jwt.verify(token, config.secret);
    models.User.findAll({ 
        include: [{ model: models.Post }, { model: models.Comment }],   
    })
    .then(users => { return res.status(200).send(users) })
    .catch(error => res.status(400).json({ error }));
}

//Modifier photo de profil
exports.updateProfil = async (req, res) => {   
        const token = req.headers.authorization.split(' ')[1]; 
        result = jwt.verify(token, config.secret);
        const userObject = req.file ? { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };

        await models.User.update({ ...userObject }, { where: { id: result.id } })
        .then(() => { res.status(201).json({ message: 'Profil modifié !'}) })
        .catch(error => res.status(500).json({ error }));   
}

//Suppression du profil
exports.deleteProfil = async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; 
        result = jwt.verify(token, config.secret);

        await models.Comment.destroy({ where: { userId: result.id }})

        const posts = await models.Post.findAll({ where: { userId: result.id }})
        posts.forEach(post => {
            const postFilename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${postFilename}`, () => {
                post.destroy()
                .then(() => { res.status(200).json({ message: 'Posts supprimés !'}) })
                .catch(error => res.status(500).json({ error }));
            })
        })

        const user = await models.User.findOne({ where: { id: result.id }})
        const filename = user.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
            user.destroy()
            .then(() => { res.status(200).json({ message: 'Profil supprimé !'}) })
            .catch(error => res.status(500).json({ error }));
        }) 
    }