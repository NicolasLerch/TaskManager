module.exports = (sequelize, DataTypes) => {
    let alias = "UsersProjects";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        project_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "users_projects",
        timestamps: false
    }

    const UsersProjects = sequelize.define(alias, cols, config);

    
    return UsersProjects

}