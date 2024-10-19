'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chapters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chapter_name: {
        type: Sequelize.STRING(255),
      },
      content: {
        type: Sequelize.TEXT,
      },
      story_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'id' },
      },
      slug: {
        type: Sequelize.STRING(255),
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      published_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      chapter_order: {
        type: Sequelize.INTEGER,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chapters')
  },
}
