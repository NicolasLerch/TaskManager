module.exports = (sequelize, DataTypes) => {
    const alias = "Task";
    const cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priority:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        project_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: "tasks",
        timestamps: false
    }

    const Task = sequelize.define(alias, cols, config);

    Task.associate = (models) => {
        Task.belongsTo(models.Project, {
            as: "project",
            foreignKey: "project_id"
        })

        Task.hasMany(models.ChecklistItem, {
            as: "checklistItems",
            foreignKey: "task_id"
        })
    }

    return Task
}