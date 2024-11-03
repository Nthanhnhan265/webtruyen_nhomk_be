const { User } = require('@models/')
const createHttpError = require('http-errors')
const message = require('@root/message.js')

//=======================
// Authentication functions
//=======================

/**LOGIN
 * @param {string} email - email người dùng
 */
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      throw createHttpError.NotFound(message.auth.emailNotFound)
    }
    return user
  } catch (error) {
    throw error
  }
}

module.exports = { findUserByEmail }
