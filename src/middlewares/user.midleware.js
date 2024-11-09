const JWT = require('jsonwebtoken');
const createHttpError = require('http-errors');
const message = require('@root/message.js');

/** AUTHENTICATE USER FROM COOKIE
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next - gọi middleware kế tiếp
 */
function authenticateUser(req, res, next) {
  try {
    // Kiểm tra xem cookie có tồn tại không
    if (!req.cookies || !req.cookies.authToken) {
      return next(createHttpError.Unauthorized("không có token"));
    }

    const token = req.cookies.authToken;
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(createHttpError.Unauthorized("your-secret-key"));
      }
      req.userId = decoded.userId;  // Gán userId để dùng trong các middleware hoặc route tiếp theo
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
}

module.exports = {
  authenticateUser,
};
