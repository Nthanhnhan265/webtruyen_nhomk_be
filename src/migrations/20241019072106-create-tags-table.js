'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tag_name: {
        type: Sequelize.STRING(255),
      },
      tag_slug: {
        type: Sequelize.STRING(255),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tags')
  },
}
