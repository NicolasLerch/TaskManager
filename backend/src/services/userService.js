const { error } = require("console");
const db = require("../../models");
const { processLogin } = require("../controllers/userController");

const userService = {
  userById: async function (req, res) {
    let response = "";
    try {
      let user = await db.User.findByPk(req.params.id);
      if (user === null || user === undefined) {
        response = {
          status: 404,
          success: false,
          message: "User not found",
        };
        return res.send(response);
      }

      response = {
        status: 200,
        success: true,
        user: user,
      };
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
    return res.send(response);
  },

  save: async function (req, res) {
    try {
      const { name, last_name, email, password, role } = req.body;
      await db.User.create({
        name,
        last_name,
        email,
        password,
        role,
      });
      res.send("User created");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  allUsers: async function (req, res) {
    let response = "";
    try {
      const users = await db.User.findAll({
        attributes: {exclude: ['password']}
    })
      response = {
        status: 200,
        success: true,
        count: users.length,
        users,
      };
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
    return res.send(response);
  },
  userByProject: async function (req, res) {
    let response = "";
    try {
      const project_id = req.query.project_id;
      const project = await db.Project.findByPk(project_id, {
        include: {
          model: db.User,
          as: "users",
          attributes: ["name", "last_name"],
        },
      });

      if (project == null || project == undefined) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
        return res.send(response);
      }
      const users = project.users;
      response = {
        status: 200,
        success: true,
        count: users.length,
        users,
      };
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
    return res.send(response);
  },
  userByTask: async function (req, res) {
    let response = "";
    try {
      const task_id = req.params.task_id;
      const task = await db.Task.findByPk(task_id, {
        include: {
          model: db.User,
          as: "users",
          attributes: ["name", "last_name"],
        },
      });

      if (task == null || task == undefined) {
        response = {
          status: 404,
          success: false,
          message: "Task not found",
        };
        return res.send(response);
      }
      const users = task.users;
      response = {
        status: 200,
        success: true,
        count: users.length,
        users,
      };
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
    return res.send(response);
  },
  ediUser: async function (req, res) {
    let response = "";
    try {
      const { name, last_name, email, password, role } = req.body;
      let user = await db.User.findByPk(req.params.id);

      if (user == null || user == undefined) {
        response = {
          status: 404,
          success: false,
          message: "User not found",
        };
        return res.send(response);
      }
      await db.User.update(
        {
          name,
          last_name,
          email,
          password,
          role,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      let userUpdated = await db.User.findByPk(req.params.id);
      response = {
        status: 200,
        success: true,
        message: "User updated",
        user: userUpdated,
      };
    } catch (err) {
      console.log();
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
    return res.send(response);
  },
  processLogin: async function(req, res){
    try{
      let user = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })

      console.log(user);
      
  
      if(!user || user === null){
        return res.status(400).json({
          success: false,
          msg: 'User not found'
        })
      }
  
      if(user.password !== req.body.password){
        return res.status(400).json({
          success: false,
          msg: 'Invalid password'
        })
      }
  
      return res.status(200).json({
        success: true,
        user
      })

    } catch(err){
      console.log(error);
      return res.send('Ocurrio un error')
    }    

  }
};

module.exports = userService;
