const createHttpError = require('http-errors')
const {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUserById,
} = require('@services/user.service')
const message = require('@root/message')

// ==========================
// User Handler Functions
// ==========================
// CREATE USER
/**
 * Xử lý yêu cầu tạo một người dùng mới.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleCreateUser(req, res, next) {
  //lấy dữ liệu từ form
  const {
    username,
    email,
    password,
    confirmPassword,
    role_id,
    status,
    avatar,
  } = req.body

  //xác thực đầu vào

  //tạo người dùng mới
  try {
    const newUser = await createUser({
      username,
      email,
      password,
      role_id,
      status,
      avatar,
    })

    return res.status(201).json({
      success: true,
      status: 201,
      message: message.user.createSucess,
      data: newUser,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

// READ USER
/**
 * Xử lý yêu cầu lấy danh sách tất cả người dùng.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function handleGetUsers(req, res, next) {
  try {
    // Các trường hợp sắp xếp hợp lệ
    const validSortFields = ['id', 'username', 'email', 'createdAt']
    // Các thứ tự hợp lệ
    const validOrderValues = ['ASC', 'DESC']
    const sortBy = req.query.sortBy || 'id'
    const order = req.query.order || 'ASC'

    // Kiểm tra xem sortBy có hợp lệ không
    if (!validSortFields.includes(sortBy)) {
      const err = new Error(message.generalErrors.invalidDataQuery)
      err.status = 400
      throw err
    }
    // Kiểm tra xem order có hợp lệ không
    if (!validOrderValues.includes(order.toUpperCase())) {
      const err = new Error(message.generalErrors.invalidDataQuery)
      err.status = 400
      throw err
    }
    let data = await getAllUsers(sortBy, order)
    return res.status(200).json({
      success: true,
      message: message.user.fetchSucess,
      data: data,
      links: [],
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

/**
 * Xử lý yêu cầu lấy thông tin chi tiết của người dùng theo ID.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function handleGetUserByID(req, res, next) {
  try {
    const id = req.params.id
    let data = await getUserByID(id)
    // Kiểm tra xem người dùng có tồn tại không
    if (!data) {
      next(createHttpError(404, message.user.notFound))
    }
    return res.status(200).json({
      success: true,
      message: message.user.fetchSucess,
      data: data,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Xử lý yêu cầu lấy thông tin chi tiết của người dùng theo ID.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function handleUpdateUserByID(req, res, next) {
  try {
    const id = req.params.id
    const newdata = req.body
    const result = await updateUser(id, newdata)
    if (result.error) {
      next(result.error)
    }
    if (result.message) {
      console.log(result.message)
      return res.status(200).json({
        success: true,
        status: 200,
        message: result.message,
        data: null,
        links: [],
      })
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: message.user.updateSuccess,
      data: result,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Xử lý yêu cầu xóa người dùng theo ID.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function handleDeleteUser(req, res, next) {
  const id = req.params.id
  try {
    const result = await deleteUserById(id)
    if (result.error) {
      return next(result.error) // Gọi middleware xử lý lỗi với lỗi 404
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: message.user.deleteSuccess,
      data: [],
      links: [],
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  handleGetUsers,
  handleGetUserByID,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUserByID,
}
