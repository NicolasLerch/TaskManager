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
  addChecklistItem: async function(req, res){
    try{
      const { item, task_id, is_completed } = req.body
      await db.ChecklistItem.create({
        item,
        task_id,
        is_completed
      })

      res.send('Checklist item added')

    } catch(err){
      console.log(err);
      res.send('An error has occurred. Please try again later.')      
    }
  },
  getAllTasks: async function(req, res){
    try{
      const tasks = await db.Task.findAll({
        include: [{
          model: db.ChecklistItem,
          as: 'checklistItems'
        }]
      })

      let response = {
        status: 200,
        success: true,
        count: tasks.length,
        tasks
      }

      res.send(response)

    } catch(err){
      console.log(err);
      res.send('An error has occurred. Please try again later.')      
    }
  },
  taskByProject: async function(req, res){
    try{
      const project_id = req.params.project_id
      const tasks = await db.Task.findAll({
        where: {
          project_id
        },
        include: [{
          model: db.ChecklistItem,
          as: 'checklistItems'
        }]
      })
      let response = {
        status: 200,
        success: true,
        count: tasks.length,
        tasks
      }
      return res.send(response)
    } catch(err){
      console.log(err);
      res.send('An error has occurred. Please try again later.')      
    }
  }
};

module.exports = service;