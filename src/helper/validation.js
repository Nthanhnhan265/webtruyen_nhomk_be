//==================Validation API==================//

const Joi = require('joi')
const message = require('@root/message.js')
/* 
    userValidate: validate user's data 
*/

const userValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().min(1).max(255).required().messages({
      'string.empty': message.user.usernameRequired,
      'string.pattern.base': message.user.usernameSpecialChars,
    }),
    email: Joi.string().email().required().max(255).messages({
      'string.email': message.user.emailRequired,
      'string.max': message.user.emailLength,
    }),
    password: Joi.string().min(1).max(255).required().messages({
      'string.empty': message.user.passwordRequired,
      'string.pattern.base': message.user.passwordStrength,
    }),
    confirmPassword: Joi.string().min(1).max(255).required().messages({
      'string.empty': message.user.passwordRequired,
      'string.pattern.base': message.user.passwordStrength,
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
  }).optional()
  return userSchema.validate(data)
}
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
