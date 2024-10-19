'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          user_id: 1,
          chapter_id: 1,
          content: 'This is a comment for chapter 1 of story one',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Thêm các bình luận khác tương tự...
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {})
  },
}
