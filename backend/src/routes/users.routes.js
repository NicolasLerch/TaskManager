const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')


router.post('/', userController.processLogin)

module.exports = router