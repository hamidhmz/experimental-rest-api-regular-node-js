const express = require('express');
const router = express.Router();

const {
	addPost,
	getAllPosts,
	deleteAllPosts,
} = require('../controller/PostController');

router.post('/', addPost);
router.get('/', getAllPosts);
router.delete('/all', deleteAllPosts);

module.exports = router;
