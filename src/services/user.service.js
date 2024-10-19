const User = require('@models/user.model')
const createError = require('http-errors')
const message = require('@root/message')
// ==========================
// User CRUD Functions
// ==========================

// CREATE USER
/**
 * Tạo một người dùng mới.
 * @param {Object} user - Đối tượng chứa thông tin người dùng mới.
 * @returns {Promise<Object>} - Trả về đối tượng người dùng đã được tạo.
 */
async function createUser(user) {
  try {
    return await User.create(user)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      throw createError(400, error.errors.map((err) => err.message).join(', '))
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      const uqField = error.errors[0].path
      if (uqField === 'email') {
        throw createError(409, message.user.emailExisted)
      } else if (uqField === 'username') {
        throw createError(409, message.user.usernameExisted)
      }
    } else {
      throw createError(500, message.user.createFailed)
    }
  }
}

// READ USER
/**
 * Lấy danh sách tất cả người dùng.
 * @returns {Promise<Array>} - Trả về danh sách người dùng.
 */
async function getAllUsers() {
  return await User.findAll({
    attributes: [
      'id',
      'avatar',
      'username',
      'email',
      'role_id',
      'status',
      'created_at',
    ],
    order: ['id'],
  })
}

/**
 * Lấy thông tin chi tiết của một người dùng theo ID.
 * @param {number} id - ID của người dùng cần lấy thông tin.
 * @returns {Promise<Object|null>} - Trả về đối tượng người dùng hoặc null nếu không tìm thấy.
 */
async function getUserByID(id) {
  return await User.findByPk(id, {
    attributes: [
      'id',
      'avatar',
      'username',
      'email',
      'role_id',
      'status',
      'created_at',
    ],
  })
}

// UPDATE USER
/**
 * Cập nhật thông tin người dùng.
 * @param {number} id - ID của người dùng cần cập nhật.
 * @param {Object} updatedData - Đối tượng chứa dữ liệu cập nhật.
 * @returns {Promise<Object>} - Trả về đối tượng người dùng đã được cập nhật.
 */
async function updateUser(id, updatedData) {
  // Logic để cập nhật người dùng
}

// DELETE USER
/**
 * Xóa một người dùng theo ID.
 * @param {number} id - ID của người dùng cần xóa.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function deleteUser(id) {
  // Logic để xóa người dùng
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
}
