const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/all', userController.getAllUsers)
router.get('/:id', userController.userById)
router.post('/save', userController.save)

// router.get('/', userController.userByProject)
router.get('/:task_id', userController.userByTask)


router.put('/edit/:id', userController.editUser)



module.exports = router;