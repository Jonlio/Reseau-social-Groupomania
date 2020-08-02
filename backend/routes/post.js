const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const multer = require('../middleware/multer-config');
 
//Routes User
router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;