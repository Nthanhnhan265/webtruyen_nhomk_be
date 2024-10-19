'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genres', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      genre_name: {
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
    await queryInterface.dropTable('genres')
  },
}
