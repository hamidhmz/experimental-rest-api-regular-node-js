const express = require('express');
const router = express.Router();

const { addUser } = require('../controller/UserController');

router.post('/', addUser);

module.exports = router;
