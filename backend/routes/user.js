const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
//Routes User
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getProfile);
router.put('/:id',auth, userCtrl.modifyProfile);
router.delete('/:id',auth, userCtrl.deleteProfile);

module.exports = router;

//TODO: Authentifier les routes