const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')

router.get('/', projectController.getAllProjects)

router.post('/save', projectController.save)

module.exports = router;