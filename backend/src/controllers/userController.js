const userServices = require('../services/userService')
const controller = {

    example: function (req, res) {
        userServices.example()
    },

    save: async function (req, res) {
        await userServices.save(req, res);
    },
    userById: async function (req, res) {
        await userServices.userById(req, res);
    },

    getAllUsers: async function(req, res){
        await userServices.allUsers(req, res)
    },
    userByProject: async function(req, res){
        await userServices.userByProject(req, res)
    },
    userByTask: async function(req, res){
        await userServices.userByTask(req, res)
    },
    editUser: async function(req, res){
        await userServices.ediUser(req, res)
    }

}

module.exports = controller;