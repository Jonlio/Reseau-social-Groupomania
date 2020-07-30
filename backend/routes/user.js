const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
 
//Routes User
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getProfile);
router.put('/:id', userCtrl.modifyProfile);
router.delete('/:id', userCtrl.deleteProfile);

module.exports = router;

//TODO: Authentifier les routes