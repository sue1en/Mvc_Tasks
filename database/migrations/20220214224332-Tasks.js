'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
        unique: true,
        allowNull: false
      },
      title: {
        allowNull: false,
        type:DataTypes.STRING
      },
        user_id: {
        allowNull:false,
        type: DataTypes.STRING,
        foreignKey: true,
        references: { model: "users", key: "id" }
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('tasks');
  }
};