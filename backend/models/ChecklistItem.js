module.exports = (sequelize, DataTypes) => {
    const alias = "ChecklistItem";
    const cols ={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        task_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_completed:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }

    const config = {
        tableName: "checklistItems",
        timestamps: false
    }
    const ChecklistItem = sequelize.define(alias, cols, config);

    ChecklistItem.associate = (models) => {
        ChecklistItem.belongsTo(models.Task, {
            as: "task",
            foreignKey: "task_id"
        })
    }

    return ChecklistItem
}