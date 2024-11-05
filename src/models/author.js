'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // Định nghĩa quan hệ ở đây nếu cần
    }
  }

  Author.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Author',
      timestamps: false, // Thiết lập không sử dụng timestamps
    },
  )

  return Author
}

// const { Sequelize, DataTypes } = require('sequelize')
// // const sequelize = require('../config/db_config');

// const Author = sequelize.define(
//   'Author',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     author_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     slug: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   },
// )

// module.exports = Author
