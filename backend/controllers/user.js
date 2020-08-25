const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');
const config = require('../config/auth.config');

//Création d'un utilisateur
exports.signup = (req, res) => {
    const userObject = JSON.parse(req.body.user);
    models.User.findOne({ where: { email: userObject.email } })
        .then(findUser => {
            if (findUser) {
                return res.status(401).json({ message: 'Cet utilisateur est déjà enregistré' });
            } 
                 bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        models.User.create({ ...userObject, password:hash, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
                        .then(() => { res.status(201).json({ message: 'Profil enregistré !'}) })
                        .catch(error => res.status(400).json({ error }));
                    })
                .catch(error => res.status(500).json({ error }));
        })
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
                      return res.status(401).json({ error: 'Mot de passe incorrect!' });
                    }
                    return res.status(200).json({ token: jwt.sign({ id: user.id }, config.secret, { expiresIn: '24h'}) });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Affichage d'un profil
exports.getProfile = (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader){
        const token = req.headers.authorization.split(' ')[1]; 
        result = jwt.verify(token, config.secret);
    models.User.findOne({ where: { id: result.id } })
        .then(user => { return res.status(200).send(user) })
        .catch(error => res.status(400).json({ error }));
}
}

//Modification du profil
exports.modifyProfile = (req, res) => {
    const userObject = req.file ? { ...JSON.parse(req.body.user), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
                models.User.update({ ...userObject }, { where: { id: req.params.id} })
                .then(() => res.status(201).json({ message: 'Votre profil a été mis à jour!' }))
                .catch(error => res.status(400).json({ error }));
            }
      
//Suppression du profil
exports.deleteProfile =  (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader){
        const token = req.headers.authorization.split(' ')[1]; 
        result = jwt.verify(token, config.secret);
    models.User.findOne({ where: { id: result.id} })
        .then((user) => {
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                user.destroy()
                    .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
}
