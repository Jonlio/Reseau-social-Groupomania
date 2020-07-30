const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config/auth.config');

const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Création d'un utilisateur
exports.signup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (username.length <= 0) {
        return res.status(401).json({ message: 'Merci de compléter tous les champs' });
    }
    if (!regexMail.test(email)) {
        res.status(401).json({ message: 'Format Email invalide' });
    } else {
        models.User.findOne({ where: { email: email } })
            .then(findUser => {
                if (findUser) {
                    return res.status(401).json({ message: 'Cet utilisateur est déjà enregistré' });
                } else {
                    const count = password.length;
                    if (count < 8) {
                        return res.status(401).json({ message: 'Le MDP doit contenir 8 caractères minimum' });
                    } else {
                        bcrypt.hash(password, 10)
                            .then(hash => {
                            models.User.create({ username: username, email: email, password: hash});
                            return res.status(201).json({ message: 'Utilisateur créé !' })
                            })
                    }
                }
            }).catch(error => res.status(500).json({ error }));
    }
};

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
                return res.status(401).json({ error: 'Mot de passe incorrect!' });
            }
            return res.status(200).json({ token: jwt.sign ({ id: user.id }, config.secret, { expiresIn: '24h' }) });
        })
        .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
};

//Affichage d'un profil
exports.getProfile = (req,res) => {
    models.User.findOne({ where: { id: req.params.id } })
    .then(user => {
        return  res.status(200).send(user)
    })
    .catch(error => res.status(400).json({ error }));
}

//Modification du profil
exports.modifyProfile = (req,res) => {
    models.User.findOne({ where: { id: req.params.id  } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Vous ne pouvez pas modifier ce profil!' });
        } else {
            models.User.update({ username: req.body.username }, { where: {id:req.params.id} })
            return res.status(201).json({ message: 'Votre profil a été mis à jour!' });
        }
    })
    .catch(error => res.status(500).json({ error }));
}

//Suppression du profil
exports.deleteProfile = (req,res) => {
    models.User.findOne({ where: { id: req.params.id  } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Vous ne pouvez pas supprimer ce profil!' });
            } else {
            models.User.destroy({ where: { id: req.params.id } })
            return res.status(200).json({ message: 'Votre profil a été supprimé!' });
        }
    })
     .catch(error => res.status(500).json({ error }));
 } 
    
 //TODO: Gérer photo de profil(multer)