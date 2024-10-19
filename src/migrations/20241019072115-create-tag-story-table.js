'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tag_story', {
      tag_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tags', key: 'id' },
      },
      story_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'id' },
      },
      description: {
        type: Sequelize.TEXT,
      },
      primaryKey: ['tag_id', 'story_id'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tag_story')
  },
}
