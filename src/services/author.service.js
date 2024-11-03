const { Author } = require('../models')
const { Op } = require('sequelize') // Import toán tử Op từ Sequelize

// Tạo tác giả mới
const createAuthor = async (authorData) => {
  return await Author.create(authorData)
}

const getAllAuthors = async (
  author_name,
  description,
  sortOrder,
  page,
  limit,
) => {
  try {
    const whereConditions = []

    // Construct where conditions if author_name or description are provided
    if (author_name) {
      whereConditions.push({
        author_name: {
          [Op.like]: `%${author_name}%`,
        },
      })
    }

    if (description) {
      whereConditions.push({
        description: {
          [Op.like]: `%${description}%`,
        },
      })
    }

    console.log('Where Conditions:', whereConditions)

    // Fetch authors with pagination
    const authors = await Author.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      order: [['author_name', sortOrder === 'desc' ? 'DESC' : 'ASC']],
      offset: (page - 1) * limit,
      limit: limit,
    })

    // Count total authors that match the criteria
    const totalCount = await Author.count({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
    })

    // Return authors and total count
    return {
      authors: authors.length > 0 ? authors : [],
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit), // Calculate total pages
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching authors:', error)
    throw error // Rethrow error to be handled upstream if needed
  }
}

// Lấy tác giả theo ID
const getAuthorById = async (id) => {
  return await Author.findByPk(id)
}

// Cập nhật tác giả
const updateAuthor = async (id, authorData) => {
  return await Author.update(authorData, { where: { id } })
}

// Xóa tác giả
const deleteAuthor = async (id) => {
  return await Author.destroy({ where: { id } })
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
}
