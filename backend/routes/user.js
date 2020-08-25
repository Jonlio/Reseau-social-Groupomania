const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
//Routes User
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getProfile);
router.put('/',auth, userCtrl.modifyProfile);
router.delete('/',auth, userCtrl.deleteProfile);

module.exports = router;

