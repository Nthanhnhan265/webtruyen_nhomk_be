'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      author_name: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING(255),
      },
      slug: {
        type: Sequelize.STRING(255),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors')
  },
}
