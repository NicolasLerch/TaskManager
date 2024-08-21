const db = require('../../models')

const userService = {
    example: function(req, res){
        res.send({
            user: "Jhon Doe",
            mail: "example@mail.com"
        })
    },

    save: async function(req, res){
        try{
            const { name, last_name, email, password, role } = req.body
            await db.User.create({
                name,
                last_name,
                email,
                password,
                role
            })
            res.send('User created')

        } catch(err){
            console.log(err)
            res.send(err)
        }
    }

}

module.exports = userService;