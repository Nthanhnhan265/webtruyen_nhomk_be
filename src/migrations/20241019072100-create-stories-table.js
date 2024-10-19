'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: { model: 'authors', key: 'id' },
      },
      description: {
        type: Sequelize.TEXT,
      },
      story_name: {
        type: Sequelize.STRING(255),
      },
      total_chapters: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      cover: {
        type: Sequelize.STRING(255),
      },
      keywords: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stories')
  },
}
