'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('users', {
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
        type:DataTypes.STRING
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};