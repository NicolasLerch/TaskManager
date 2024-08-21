const projectService = require('../services/projectService')

const controller = {
    save: async function(req, res){
        await projectService.save(req, res)
    },
    getAllProjects: async function(req, res){
        await projectService.getAllProjects(req, res);
    }
}

module.exports = controller