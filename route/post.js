const express = require('express');

const { auth } = require('../middleware');

const router = express.Router();

const {
	addPost,
	getAllPosts,
	deleteAllPosts,
} = require('../controller/PostController');

router.post('/', auth, addPost);
router.get('/', auth, getAllPosts);
router.delete('/all', deleteAllPosts);

module.exports = router;
