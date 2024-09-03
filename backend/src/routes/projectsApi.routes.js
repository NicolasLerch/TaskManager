const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')

router.get('/all', projectController.getAllProjects)
router.get('/', projectController.projectByUser) //user_id=
router.delete('/:project_id/removeUser/:user_id', projectController.removeUser)
router.get('/:id', projectController.projectById) 
router.post('/save', projectController.save)

router.put('/edit/:id', projectController.editProject)


router.delete('/:id', projectController.deleteProject)

module.exports = router;