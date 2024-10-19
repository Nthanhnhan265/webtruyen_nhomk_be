'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        references: { model: 'chapters', key: 'id' },
      },
      content: {
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
      primaryKey: ['user_id', 'chapter_id'],
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments')
  },
}
