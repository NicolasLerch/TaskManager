module.exports = (sequelize, DataTypes) => {
    const alias = "Project";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }

    const config = {
        tableName: "projects",
        timestamps: false
    }

    const Project = sequelize.define(alias, cols, config);

    Project.associate = (models) => {
        Project.hasMany(models.Task, {
            as: "tasks",
            foreignKey: "project_id"
        })

        Project.belongsToMany(models.User, { 
            through: 'users_projects', 
            as: 'Users',
            foreignKey: 'project_id',
            timestamps: false
        });
    }

    return Project;
}