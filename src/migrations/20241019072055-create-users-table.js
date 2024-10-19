'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: { model: 'role', key: 'id' },
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
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      avatar: {
        type: Sequelize.STRING(255),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  },
}
