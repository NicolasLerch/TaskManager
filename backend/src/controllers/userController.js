const userServices = require('../services/userServices')
const controller = {

    example: function (req, res) {
        userServices.example()
    }

}

module.exports = controller;