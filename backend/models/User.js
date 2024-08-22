module.exports = (sequelize, DataTypes) => {
  const alias = "User";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  };

  const config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsToMany(models.Project, { 
        through: 'users_projects', 
        as: 'Projects',  // Alias que usarás para incluir proyectos cuando busques usuarios
        foreignKey: 'user_id',
        timestamps: false
    });

    User.belongsToMany(models.Task,{
      through: 'users_tasks',
      as: 'Tasks',
      foreignKey: 'user_id',
      timestamps: false
    })
  };

  return User;
};
