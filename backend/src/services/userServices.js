const userService = {
    example: function(req, res){
        res.send({
            user: "Jhon Doe",
            mail: "example@mail.com"
        })
    }

}

module.exports = userService;