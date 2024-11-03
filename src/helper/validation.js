//==================Validation API==================//

const Joi = require('joi')
const message = require('@root/message.js')
/** USER'S VALIDATION FUNCTION
 * Kiểm tra tạo người dùng và chỉnh sửa ngườid dùng
 * @param {Object} data
 * @param {Boolean} isEdit
 * @returns
 */
const userValidate = (data, isEdit = false) => {
  const joiObject = {
    username: Joi.string().min(1).max(255).required().messages({
      'string.empty': message.user.usernameRequired,
      'string.pattern.base': message.user.usernameSpecialChars,
    }),
    email: Joi.string().email().required().max(255).messages({
      'string.empty': message.user.emailRequired,
      'string.max': message.user.emailLength,
    }),
    avatar: Joi.string().required().messages({
      'string.empty': message.user.coverImageRequired,
    }),
    role_id: Joi.number().required().messages({
      'number.base': message.user.roleNotFound,
    }),
    status: Joi.boolean().required().messages({
      'boolean.base': message.user.statusNotFound,
    }),
  }
  if (!isEdit) {
    joiObject.password = Joi.string().min(1).max(255).messages({
      'string.empty': message.user.passwordRequired,
      'string.pattern.base': message.user.passwordStrength,
    })
    joiObjectj.confirmPassword = Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'string.empty': message.user.passwordRequired,
        'string.pattern.base': message.user.passwordStrength,
        'any.only': message.user.passwordsDoNotMatch,
      })
  }
  const userSchema = Joi.object(joiObject).optional()
  return userSchema.validate(data)
}

/** USER'S LOGIN VALIDATION
 * Kiểm tra thông tin đăng nhập
 * @param {Object} data
 * @returns
 */
const loginValidate = (data) => {
  const rule = Joi.object({
    email: Joi.string().required().messages({
      'string.empty': message.auth.emailRequired,
    }),
    password: Joi.string().required().messages({
      'string.empty': message.auth.passwordRequired,
    }),
  })
  return rule.validate(data)
}

module.exports = { userValidate, loginValidate }
