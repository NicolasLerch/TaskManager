const db = require("../../models");
const service = {
  save: async function (req, res) {
    let response = {};
    try {
      const { name, description, created_at, finish_date, creator } = req.body;
      const newProject = await db.Project.create({
        name,
        description,
        created_at: created_at || Date.now(),
        finish_date,
        creator,
      });

      let response = {
        status: 200,
        success: true,
        message: "Project created succesfully",
        project: newProject,
      };

      console.log(response);
      

      await db.UsersProjects.create({
        project_id: newProject.id,
        user_id: creator,
      })
      // return res.redirect(`/home/project/${newProject.id}`);

      return res.send(response);
      
    } catch (err) {
      console.log(err);
      res.json({ message: "Project not created" });
    }
  },
  getAllProjects: async function (req, res) {
    try {
      const projects = await db.Project.findAll({
        include: [
          {
            model: db.User,
            as: "users",
            attributes: ["name", "last_name"],
          },
          {
            model: db.User,
            as: "project_creator",
            attributes: ["name", "last_name", "id"],
          },
        ],
      });

      let response = {
        status: 200,
        success: true,
        count: projects.length,
        projects,
      };

      return res.send(response);
    } catch (err) {
      console.log(err);
      res.send("An error has occurred. Please try again later.");
    }
  },
  projectById: async function (req, res) {
    try {
      let projectToEdit = await db.Project.findByPk(req.params.id, {
        include: [
          {
            model: db.User,
            as: "users",
            attributes: ["name", "last_name"],
          },
          {
            model: db.User,
            as: "project_creator",
            attributes: ["name", "last_name", "id"],
          },
          {
            model: db.Task,
            as: "tasks",
            include: [
              {
                model: db.User,
                as: "users",
                attributes: ["name", "last_name"],
              },
            ],
          },
        ],
      });

      let response = "";
      if (!projectToEdit) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
      } else {
        response = {
          status: 200,
          success: true,
          projectToEdit,
        };
      }

      return res.send(response);
    } catch (err) {
      console.log(err);
      let response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
    }
  },
  projectByUser: async function (req, res) {
    let response = "";
    try {
      const user_id = req.query.user_id;
      let user = await db.User.findByPk(user_id);

      if (user == null) {
        response = {
          status: 404,
          success: false,
          message: "User not found",
        };
        return res.send(response);
      }

      let projects = await db.Project.findAll({
        include: [
          {
            model: db.User,
            as: "users",
            where: {
              id: user_id,
            },
            attributes: ["name", "last_name"],
          },
          {
            model: db.Task,
            as: "tasks",
          },
        ],
      });

      if (!projects) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
      } else {
        response = {
          status: 200,
          success: true,
          projects,
        };
      }
      return res.send(response);
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
      return res.send(response);
    }
  },

  editProject: async function (req, res) {
    let response = "";
    try {
      const { name, description, finish_date } = req.body;
      let projectToEdit = await db.Project.findByPk(req.params.id);

      if (
        (projectToEdit = null || projectToEdit == undefined || !projectToEdit)
      ) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
        return res.send(response);
      }

      await db.Project.update(
        {
          name,
          description,
          finish_date,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      response = {
        status: 200,
        success: true,
        message: "Project updated",
      };

      return res.send(response);
    } catch (err) {
      console.log(err);
      response = {
        status: 500,
        success: false,
        message: "An error has occurred. Please try again later.",
      };
      return res.send(response);
    }
  },
  deleteProject: async function (req, res) {
    let response = "";
    let creator_id = null;
    try {
      let projectToEdit = await db.Project.findByPk(req.params.id);

      if (
        projectToEdit == null ||
        projectToEdit == undefined ||
        !projectToEdit
      ) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
        return res.send(response);
      }
      console.log(projectToEdit.creator);

      if (projectToEdit.creator === req.body.user_id) {
        await db.Project.destroy({
          where: {
            id: req.params.id,
          },
        });
        response = {
          status: 200,
          success: true,
          message: "Project deleted",
        };
      } else {
        response = {
          status: 403,
          success: false,
          message: "You are not authorized to delete this project",
        };
      }
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
  removeUser: async function (req, res) {
    let response = "";
    
    try {
      let project = await db.Project.findByPk(req.params.project_id,{
        include: [
          {
            model: db.User,
            as: "users",
            attributes: ["name", "last_name", "id"],
          },
        ],
      });
      if (project == null || project == undefined || !project) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
        return res.send(response);
      }

      await db.UsersProjects.destroy({
        where : {
          project_id: req.params.project_id,
          user_id: req.params.user_id
        }
      })

      response = {
        status: 200,
        success: true,
        msg: "User removed",
      }
      
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
};

module.exports = service;
