const express = require('express')
const router = express.Router();
const taskController = require('../controllers/taskController')

router.get('/', taskController.getAllTasks)

router.post('/save', taskController.save)

router.post('/addChecklistItem', taskController.addChecklistItem)

router.get('/:project_id', taskController.taskByProject)

module.exports = router;