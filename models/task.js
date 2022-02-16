module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define("tasks",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
        unique: true,
        allowNull: false,},
      title: { 
        allowNull: false,
        type:DataTypes.STRING 
      },
      user_id: {
        type: DataTypes.STRING,
        foreignKey: true
      }
    },
    {
      timestamps: false,
      underscore: true,
      paranoid: true,
    }
  );
  tasks.associate = function (models) {
    tasks.belongsTo(models.users, 
      {foreignKey: 'user_id', as:"userTask" });
}
  return tasks;
};
