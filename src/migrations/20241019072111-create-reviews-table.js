'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      story_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'id' },
      },
      star: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
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
      primaryKey: ['user_id', 'story_id'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews')
  },
}
