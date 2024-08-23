const { log } = require("console");
const db = require("../../models");
const service = {
  save: async function (req, res) {
    try {
      const { name, description, priority, status, project_id } = req.body;
      await db.Task.create({
        name,
        description,
        priority,
        status,
        project_id,
      });

      res.send("Task created");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  addChecklistItem: async function (req, res) {
    try {
      const { item, task_id, is_completed } = req.body;
      await db.ChecklistItem.create({
        item,
        task_id,
        is_completed,
      });

      res.send("Checklist item added");
    } catch (err) {
      console.log(err);
      res.send("An error has occurred. Please try again later.");
    }
  },
  getAllTasks: async function (req, res) {
    try {
      const tasks = await db.Task.findAll({
        include: [
          {
            model: db.ChecklistItem,
            as: "checklistItems",
          },
        ],
      });

      let response = {
        status: 200,
        success: true,
        count: tasks.length,
        tasks,
      };

      res.send(response);
    } catch (err) {
      console.log(err);
      res.send("An error has occurred. Please try again later.");
    }
  },
  taskByProject: async function (req, res) {
    try {
      const project_id = req.params.project_id;
      const tasks = await db.Task.findAll({
        where: {
          project_id,
        },
        include: [
          {
            model: db.ChecklistItem,
            as: "checklistItems",
            attributes: ["id", "item", "is_completed"],
          },
          {
            model: db.User,
            as: "users",
            attributes: ["name", "last_name"],
          },
        ],
      });
      let response = {
        status: 200,
        success: true,
        count: tasks.length,
        tasks,
      };
      return res.send(response);
    } catch (err) {
      console.log(err);
      res.send("An error has occurred. Please try again later.");
    }
  },
  editTask: async function (req, res) {
    let response = "";
    try {
      const { name, description, priority, status } = req.body;
      let project = await db.Project.findByPk(req.params.project_id);
      let task = await db.Task.findByPk(req.params.task_id);

      if ((project = null || project == undefined || !project)) {
        response = {
          status: 404,
          success: false,
          message: "Project not found",
        };
      } else if ((task = null || task == undefined || !task)) {
        response = {
          status: 404,
          success: false,
          message: "Task not found",
        };
      } else {
        await db.Task.update(
          {
            name,
            description,
            priority,
            status,
          },
          {
            where: {
              id: req.params.task_id,
            },
          }
        );
        response = {
          status: 200,
          success: true,
          message: "Task updated",
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
};

module.exports = service;
