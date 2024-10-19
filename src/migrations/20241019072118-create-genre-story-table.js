'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genre_story', {
      genre_id: {
        type: Sequelize.INTEGER,
        references: { model: 'genres', key: 'id' },
      },
      story_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'id' },
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
      primaryKey: ['genre_id', 'story_id'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('genre_story')
  },
}
