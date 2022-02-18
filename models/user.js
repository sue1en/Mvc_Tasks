module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
        unique: true,
        allowNull: false
      },
      name: {
        allowNull: false,
        type:DataTypes.STRING
      },
      email: {
        allowNull: false,
        type:DataTypes.STRING
      },
      type: {
        allowNull: false,
        type:DataTypes.STRING
      },
      password: {
        allowNull: false,
        type:DataTypes.STRING,
        // select: false
      },
    },
    {
      timestamps: false,
      underscore: true,
      paranoid: true,
    }
  );
  users.associate = function (models) {
    users.hasMany(models.tasks, 
      {foreignKey: 'user_id', as:"userTask" });
}
  return users;
};
