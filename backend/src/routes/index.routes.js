const express = require('express');
const router = express.Router();
const usersApi = require('../routes/usersApi.routes')
const projectsApi = require('../routes/projectsApi.routes')
const tasksApi = require('../routes/tasksApi.routes')

router.use('/tasks', tasksApi)
router.use('/users', usersApi)
router.use('/projects', projectsApi)

module.exports = router;