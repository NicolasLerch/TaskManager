const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')

router.get('/all', projectController.getAllProjects)
router.get('/', projectController.projectByUser)
router.get('/:id', projectController.projectById)
router.post('/save', projectController.save)

module.exports = router;