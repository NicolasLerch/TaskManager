module.exports = (sequelize, DataTypes) => {
    let alias = "Comment"
    let cols ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        task_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "comments",
        timestamps: false
    }
    const Comment = sequelize.define(alias, cols, config)

    Comment.associate = (models) =>{
        Comment.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })

        Comment.belongsTo(models.Task, {
            as: "task",
            foreignKey: "task_id"
        })
    }

    return Comment;
}
