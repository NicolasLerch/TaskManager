const projectService = require('../services/projectService')

const controller = {
    save: async function(req, res){
        await projectService.save(req, res)
    },
    getAllProjects: async function(req, res){
        await projectService.getAllProjects(req, res);
    },
    projectById: async function(req, res){
        await projectService.projectById(req, res);
    },
    projectByUser: async function(req, res){
        await projectService.projectByUser(req, res);
    },

    editProject: async function(req, res){
        await projectService.editProject(req, res);
    },
    deleteProject: async function(req, res){
        await projectService.deleteProject(req, res);
    },
    removeUser: async function(req, res){
        await projectService.removeUser(req, res);
    }
}

module.exports = controller