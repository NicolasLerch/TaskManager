const userServices = require('../services/userService')
const controller = {

    example: function (req, res) {
        userServices.example()
    },

    save: async function (req, res) {
        await userServices.save(req, res);
    }

}

module.exports = controller;