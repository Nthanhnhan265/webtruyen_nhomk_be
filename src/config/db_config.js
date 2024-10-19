const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
  },
)

const config_db = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // Tạo bảng, force: true sẽ xóa bảng cũ và tạo lại
    // await sequelize.sync({ force: true })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
config_db()
module.exports = sequelize
