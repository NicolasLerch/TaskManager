const { getAllProjects } = require('../services/projectService');
const taskService = require('../services/taskService')

const controller = {
    save: async function (req, res) {
        await taskService.save(req, res);
    },
    addChecklistItem: async function(req, res){
        await taskService.addChecklistItem(req, res)
    },
    getAllTasks: async function(req, res){
        await taskService.getAllTasks(req, res)
    },
    taskByProject: async function(req, res){
        await taskService.taskByProject(req, res)
    }
}

module.exports = controller;