//=======================================================
//                    JSON WEB TOKEN
//=======================================================
const JWT = require('jsonwebtoken')

// GENERATE AN ACCESS TOKEN
/** Trả về 1 cho client 1 access token được ký bằng ACCESS_TOKEN_SECRET
 *  @param {number} userId - Id người dùng
 *  @returns {Promise}
 */
const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    }
    const secretKey = process.env.ACCESS_TOKEN_SECRET
    const option = {
      expiresIn: '10s',
    }
    JWT.sign(payload, secretKey, option, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

// GENERATE A REFRESH TOKEN
/** Trả về 1 cho client 1 access token được ký bằng REFRESHj_TOKEN_SECRET
 *  @param {number} userId - Id người dùng
 *  @returns {Promise}
 */
const signRefreshToken = (useId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      useId,
    }
    const secretKey = process.env.REFRESH_TOKEN_SECRET
    const option = {
      expiresIn: '1h',
    }
    JWT.sign(payload, secretKey, option, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

// VERIFY A REFRESH TOKEN TO CREAT A NEW PAIR
/** Xác minh tính chính
 *  @param {number} userId - Id người dùng
 *  @returns {Promise}
 */
function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) reject(err)
        resolve(payload)
      },
    )
  })
}
module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
}
