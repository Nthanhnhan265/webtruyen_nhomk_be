'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favorite_stories', {
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      story_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'id' },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      primaryKey: ['user_id', 'story_id'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorite_stories')
  },
}
