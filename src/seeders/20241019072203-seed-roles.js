'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'role',
      [
        {
          role_name: 'Admin',
          description: 'Quản trị viên',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: 'User',
          description: 'Người dùng',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {})
  },
}
