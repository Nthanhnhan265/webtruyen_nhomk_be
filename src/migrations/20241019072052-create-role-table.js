'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: Sequelize.STRING(30),
      },
      description: {
        type: Sequelize.STRING(255),
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role')
  },
}
