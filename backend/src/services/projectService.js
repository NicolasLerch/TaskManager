const db = require('../../models')
const service ={
    save: async function(req, res){
        try{
            const { name, description, created_at, finish_date } = req.body
            await db.Project.create({
                name,
                description,
                created_at: created_at || Date.now(),
                finish_date
            })
            res.send('Project created')
        } catch(err){
            console.log(err)
            res.send(err)
        }
    },
    getAllProjects: async function(req, res){
        try{
            const projects = await db.Project.findAll({
                include: {
                    model: db.User,
                    as: 'Users',
                    attributes: ['name', 'last_name']
                }
            })

            let response = {
                status: 200,
                success: true,
                count: projects.length,
                projects
            }

            return res.send(response)

        } catch(err){
            console.log(err)
            res.send("An error has occurred. Please try again later.")
        }
    }
}

module.exports = service