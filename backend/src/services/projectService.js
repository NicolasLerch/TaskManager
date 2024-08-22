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
    },
    projectById: async function(req, res){
        try{
            let project = await db.Project.findByPk(req.params.id, {
                include: [{
                    model: db.User,
                    as: 'users',
                    attributes: ['name', 'last_name']
                },{
                    model: db.Task,
                    as: 'tasks',
                    include: [{
                        model: db.User,
                        as: 'users',
                        attributes: ['name', 'last_name']
                    }]
                }]
            })

            let response = "";
            if(!project){
                response = {
                    status: 404,
                    success: false,
                    message: "Project not found"
                }
            } else{
                response = {
                    status: 200,
                    success: true,
                    project
                }
            }

            return res.send(response)

        }catch(err){
            console.log(err)
            let response = {
                status: 500,
                success: false,
                message: "An error has occurred. Please try again later."
            }
        }
    },
    projectByUser: async function(req, res){
        let response = "";
        try{
            const user_id = req.query.user_id
            let user = await db.User.findByPk(user_id)

            if(user == null){
                response = {
                    status: 404,
                    success: false,
                    message: "User not found"
                }
                return res.send(response)
            }
            
            let projects = await db.Project.findAll({
                include: [{
                    model: db.User,
                    as: 'users',
                    where:{
                        id: user_id},
                    attributes: ['name', 'last_name']
                },{
                    model: db.Task,
                    as: 'tasks'
                }]
            })

            
            if(!projects){
                response = {
                    status: 404,
                    success: false,
                    message: "Project not found"
                }}
            else{
                response = {
                    status: 200,
                    success: true,
                    projects
                }
            }
            return res.send(response)

        } catch(err){
            console.log(err)
            response = {
                status: 500,
                success: false,
                message: "An error has occurred. Please try again later."
            }
            return res.send(response)
        }
    }
}

module.exports = service