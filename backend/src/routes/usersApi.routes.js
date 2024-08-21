const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    console.log("ingreso a usersApi");
    res.send('Users Api')
})

router.get('/example', userController.example)
router.post('/save', userController.save)

module.exports = router;