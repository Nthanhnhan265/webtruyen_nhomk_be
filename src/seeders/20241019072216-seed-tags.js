'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tags',
      [
        {
          tag_name: 'Epic',
          tag_slug: 'epic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Thêm các thẻ khác tương tự...
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tags', null, {})
  },
}
