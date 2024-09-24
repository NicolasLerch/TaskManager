const express = require('express');
const router = express.Router();
const usersApi = require('../routes/usersApi.routes')
const projectsApi = require('../routes/projectsApi.routes')
const tasksApi = require('../routes/tasksApi.routes')
const login = require('../routes/users.routes')

router.use('/login', login)
router.use('/api/tasks', tasksApi)
router.use('/api/users', usersApi)
router.use('/api/projects', projectsApi)


module.exports = router;