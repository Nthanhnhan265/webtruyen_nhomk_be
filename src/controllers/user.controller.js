const createHttpError = require('http-errors')
const {
  getAllUsers,
  getUserByID,
  createUser,
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
    // console.log(error)
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
async function handleGetUser(req, res, next) {
  let data = (data = await getAllUsers())
  return res.status(200).json({
    success: true,
    message: message.user.fetchSucess,
    data: data,
  })
}

/**
 * Xử lý yêu cầu lấy thông tin chi tiết của người dùng theo ID.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 * @returns {Promise<void>} - Không trả về giá trị.
 */
async function handleGetUserByID(req, res, next) {
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
}

module.exports = {
  handleGetUser,
  handleGetUserByID,
  handleCreateUser,
}
