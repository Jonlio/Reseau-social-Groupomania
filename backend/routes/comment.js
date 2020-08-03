const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

//Routes Comment
router.post('/:id', auth, commentCtrl.createComment);
router.delete('/delete/:id', auth, commentCtrl.deleteComment);

module.exports = router;